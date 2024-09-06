import datetime
import git
from jinja2 import Template

def generate_report(repo_path):
    repo = git.Repo(repo_path)
    commits = list(repo.iter_commits('master', max_count=10))

    template = Template("""
    # Project Report

    Generated on: {{ date }}

    ## Recent Commits

    {% for commit in commits %}
    - {{ commit.hexsha[:7] }}: {{ commit.summary }} ({{ commit.author }})
    {% endfor %}
    """)

    report = template.render(
        date=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        commits=commits
    )

    with open('project_report.md', 'w') as f:
        f.write(report)

generate_report('/path/to/your/repo')
