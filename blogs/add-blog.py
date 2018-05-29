import json
import sys
import datetime
import os
from pprint import pprint

def get_data():
    with open('blogs.json') as f:
        return json.load(f)
    
def add_to_blog(new_blog, url):
    curr = get_data()
    cur_size = len(get_data())
    curr["blogs"].append(new_blog)

    w = open("blogs.json", 'w')
    w.write(json.dumps(curr))

    os.remove(url)
    print(curr)
    

def get_title():
    title = input("enter title: ")
    return title

def get_tags():
    tags = []
    print("add tags: ")

    while True:
        in_tag = input()
        if in_tag == "q":
            break;
        else:
            tags.append(in_tag)

def get_content(url):
    paragraphs=[]
    with open(url) as r:
        line = r.readline()
        while line:
            paragraphs.append(line.strip())
            line = r.readline()
    return paragraphs

def get_current_date():
    now = datetime.datetime.now()
    return '{0}-{1:02d}-{2:02d}'.format(now.year, now.month, now.day)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("invalid arguments")
        exit()
    
    url = sys.argv[1]

    if not os.path.isfile(url):
        print("invalid filename")
        exit()

    new_blog = dict()
    new_blog["id"] = len(get_data()["blogs"])
    new_blog["title"] = get_title()
    new_blog["url"] = url
    new_blog["created_at"] = get_current_date()
    new_blog["html_content"] = get_content(url)
    new_blog["tags"] = get_tags()

    add_to_blog(new_blog, url)