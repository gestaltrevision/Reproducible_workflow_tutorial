---
title: "Reproducible Reports"
subtitle: "using R Markdown"
author: "Pieter Moors"
date: "09/02/2017"
output:
  xaringan::moon_reader:
    lib_dir: libs
    nature:
      highlightStyle: github
      highlightLines: true
---

```{r setup, include=FALSE}
options(htmltools.dir.version = FALSE)
```

class: center, middle

# Why?

---

# Has this ever bothered you? 

- Copypasting statistics output into the draft of a paper

--

- Making sure you did not make any rounding errors while doing that

--

- Having to update a figure after remarks by your supervisor/reviewer (how did I make this figure again?)

--

- What were the parameter settings of my experiment again? 

--

It would be really nice if I could mix code and text, no? 

---
class: center, middle

#Enter R Markdown

---

# What are the advantages?

- It is mainly intended for **documenting** your data analyses

- You can **embed** R code in your document and **execute** it (no more copypasting) 

- You write **dynamic** documents (embed R code in plain text)

- You **export** it to HTML, PDF, Word, ...  

- It is really **easy** (for most stuff)

---

background-image: url(http://rmarkdown.rstudio.com/images/bandThree2.png)
background-position: right

# Endless possibilities 

---

# More endless possibilities 

You are not restricted to creating analysis documents. 

This presentation is written in R Markdown.

You can write full papers, create websites, interactive dashboards.

All from the same R Markdown environment!

---

# What are the disadvantages? 

It is not WYSIWYG ("What you see is what you get"), like Word or Powerpoint.

---

# When can I use it? 

I mainly use it for analysis documents that I can send to my collaborators. 

This has two advantages: 

  - Analysis and comments appear together
  - Collaborators have access to your code (code reviewing!)
  
I have used it as a [supplementary analysis file](https://perswww.kuleuven.be/~u0072929/sklar_supplement.html) for a paper.

In the future, I would like to write papers in R Markdown. 

---

class: inverse, middle, center

# Let's jump in 
