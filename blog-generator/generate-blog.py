import os
import json

def get_data():
    with open('blogs.json') as f:
        return json.load(f)

def is_blog_page(url):
    url_page = "{0}.html".format(url)
    print("checking %s" % url_page)
    return os.path.isfile(url)

def generate_blog(blog_url):
    html_template = """
        <!DOCTYPE html>
        <head>
        <meta charset="utf-8">
        <title>Jessica Prieto</title>
        <link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>	
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://d3js.org/d3.v5.min.js"></script>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="icon" href="../assets/icons/jess-icon.png">
        </head>
        <body>
        <nav class="navbar navbar-inverse navbar-default navbar-fixed-top shrink" id="navbar">
        <div class="navbar-header">
        <a class="navbar-brand scrollspy" href="../index.html"><img src="../assets/icons/jessica.png"></a>
        </div>
        <div class="container-fluid">
        <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
        </button>
        </div>

        <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
        <li><a href="../index.html#about-me">About Me</a></li>
        <li><a href="../index.html#projects">Projects</a></li>
        <li><a href="../index.html#daily">Daily</a></li>
        </ul>
        </div>
        </div>
        </nav>
        <script type="text/javascript" src="../js/renderblog.js"></script>
        <div class="blog-main container">
        <p class="hidden" id="url">{0}</p>
        <h1 id="blog-title"></h1>
        <div class="border2"></div>
        <p id="blog-date"></p>
        <div id="blog-contents"></div>
        <p id="blog-tags">Tags: </p>
        <div>
        <p id="previous-blog">previous blog: </p>
        </div>
				</div>
        </body>
    """.format(blog_url)

    new_page_file = "../blogs/%s.html" % blog_url

    new_page = open(new_page_file,"w") 
    new_page.write(html_template) 
    new_page.close()

if __name__ == "__main__":
    
    json_data = get_data()
    blogs = json_data["blogs"]
    for blog in blogs:
        if is_blog_page(blog["url"]):
            pass
        else:
            generate_blog(blog["url"])