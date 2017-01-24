Git for Psychologists
========================================================
author: Sander
date: Retreat@Vielsalm
autosize: true


A tragedy told in file names
====================================

<div style="text-align:center">
<img src="img/phd052810s.gif" style="width: 600px;"/>
</div>


Ultra-definitive-final-rev3-last-THISISTHEONE.docx
====================================

<div style="text-align:center">
<img src="img/phd101212s.png" style="width: 400px;"/>
</div>

What's Git?
========================================================

- Think: revision history/track changes/undo for entire folders
- aka: "version control system"
- Stream of snapshots
- Keeping record of what has changed (when & who)
- Time-stamped registration
- Restoring & branching
- For collaboration but also useful for the lone coder

Plain text is king
====================================

- Developed for software development: code
- But also: data, analysis code, reports, manuscripts 
- Works on anything that is plain text (.csv,.py,.html,.md,...)
- Tools do not work on docx, image, pdf files ([pandoc](pandoc.org))

Git cracking
========================================================

Several ways to use git: 
- [Command line](https://try.github.io/levels/1/challenges/1)
- GUI (e.g. [gitkraken](https://www.gitkraken.com/))
- On [Github](github.com)
- *inside Rstudio*

Initialize your project
========================================================

- Rstudio->New project->from new directory-> tick: "create git 
repository"

*or*:
- Github -> Repositories -> New

(*or*: In project folder: Command: **git init**)


Your new repository ("repo")
========================================================

Automatically creates:

- *.git*-folder where your version history lives
- *.gitignore*-file lists filetypes that should be ignored
- Optional: a *README* file
- Optional: a *LICENSE* file

Your git workflow
============================

First you code, gather data, write, analyze, plot,...

Then you add files ("staging"): determines what will go into the snapshot.

Rstudio: git tab -> Check boxes
Command: git add ...

Commitment needed
============================

Rstudio: git tab -> Commit


<div style="text-align:center">
<img src="img/git-staging-area.svg" style="width: 700px;"/>
</div>


More advantages
========================================================

- Integrity of each commit is checked (safety against file corruption) with checksums (hash values of content=names in git db)
