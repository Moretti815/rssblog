import datetime
import PyRSS2Gen

def generator(data):
    rss =PyRSS2Gen.RSS2(
        title="RSSBlog",
        link="https://rss.2005815.xyz/",
        description="Moretti RSS Blog",
        lastBuildDate = datetime.datetime.now(),

        items = [PyRSS2Gen.RSSItem(
            title=r['title'],
            link=r['link'],
            author=r['author'],
            # description=r['description'],
            pubDate=datetime.datetime.fromtimestamp(r['timestamp']),
        ) for r in data],
    )

    return "{}".format(rss.to_xml(encoding='utf-8'))