#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import codecs
from datetime import datetime

def convert_date_format(date_str):
    # Try different date formats
    date_formats = [
        "%Y-%m-%d",
        "%Y/%m/%d",
        "%Y.%m.%d",
        "%B %d, %Y",
        "%Y-%m-%dT%H:%M:%S.%fZ",
        "%Y-%m-%dT%H:%M:%SZ"
    ]
    
    for fmt in date_formats:
        try:
            date_obj = datetime.strptime(date_str.strip(), fmt)
            return date_obj.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return date_str

def update_frontmatter(file_path):
    with codecs.open(file_path, 'r', 'utf-8') as file:
        content = file.read()
    
    # Find frontmatter
    frontmatter_pattern = r'^---\s*\n(.*?)\n---'
    frontmatter_match = re.search(frontmatter_pattern, content, re.DOTALL)
    
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        # Find and replace date field
        date_pattern = r'^date:\s*(.*)$'
        date_match = re.search(date_pattern, frontmatter, re.MULTILINE)
        
        if date_match:
            old_date = date_match.group(1)
            new_date = convert_date_format(old_date)
            new_frontmatter = frontmatter.replace(
                'date: {}'.format(old_date),
                'pubDate: {}'.format(new_date)
            )
            new_content = content.replace(frontmatter, new_frontmatter)
            
            with codecs.open(file_path, 'w', 'utf-8') as file:
                file.write(new_content)
            print("Updated {}".format(file_path))

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                update_frontmatter(file_path)

# Usage
blog_directory = "/Users/clarence/Folder/GitRepositorys/AstroBlog/src/blog"
process_directory(blog_directory) 