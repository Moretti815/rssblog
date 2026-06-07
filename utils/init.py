import json
import os
import time
import requests
import buffercache

# 主源和备用源
SOURCE_BASE = "https://rss-api.2005815.xyz/"
SOURCE_BASE_LIST = [
    SOURCE_BASE,
    "https://raw.githubusercontent.com/Moretti815/rssblog-source/public/",
]


class RssblogSource(object):
    def __init__(self):
        self._bc = buffercache.BufferCache(timeout=1000*60*60*3).set_getter(self._update)
        self._url = None
        self._batch = None

    def _update(self):
        last_error = None
        for source_base in SOURCE_BASE_LIST:
            source_url = source_base + "stats.min.json"
            try:
                print(f"Trying to fetch from: {source_url}")
                raw = requests.get(source_url, timeout=10)
                print(f"get source {raw.status_code} from {source_url}")
                if raw.status_code == 200:
                    self._source_json = json.loads(raw.text)
                    print("[{}] update rssblog source".format(os.getpid()), time.time())
                    self._batch = self._source_json["batch"]
                    self._url = self._source_json["urls"]

                    self._url["source"] = self._source(self._url["source"])
                    self._url["date"] = self._date(self._url["date"])
                    for user in self._url["user"]:
                        user["date"] = self._date(user["date"])
                    return self._url, self._batch
                else:
                    last_error = f"Status code: {raw.status_code}"
            except Exception as e:
                last_error = str(e)
                print(f"Failed to fetch from {source_url}: {e}")
                continue

        # 如果所有源都失败，使用默认值或抛出更详细的错误
        if self._url is not None:
            print("Using cached data due to fetch failure")
            return self._url, self._batch

        raise Exception(f"get source error: all sources failed. Last error: {last_error}")

    @staticmethod
    def _date(date_ls):
        year = []
        for date in date_ls:
            try:
                month = {}
                for m in date[1]:
                    month[int(m[0])] = int(m[1])
                year.append({
                    "year": int(date[0]),
                    "month": month,
                })
            except (ValueError, TypeError, IndexError) as e:
                # Skip malformed date entries
                print(f"Warning: Skipping malformed date entry: {date}, error: {e}")
                continue
        year.sort(key=lambda x: x.get('year', 0), reverse=True)
        return year

    @staticmethod
    def _source(sources):
        source_mp = {}
        for source in sources:
            source_mp[source[0]] = source[1]
        return source_mp

    def immediate(self):
        self._bc.immediate()

    @property
    def url(self):
        url, _ = self._bc.update().get()
        return url

    @property
    def batch(self):
        _, batch = self._bc.update().get()
        return batch
