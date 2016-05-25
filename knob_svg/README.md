Control Knob (SVG version)
=============================

Here is Control Knob project using HTML 5 inline SVG feature
(also using jQuery libraries)

See [Live Demo](https://hpaluch.github.io/html5/knob_svg/)!

> WARNING: it is prototype only (all code embedded into main index.html)
> page

Setup for testing on Ubuntu 14.04.4 LTS
---------------------------------------
Tests are using [CasperJS](http://docs.casperjs.org/) to verify
function in real browser (WebKit) environment.

If your Ubuntu has recent phantomjs (1.9.1 or later) you can just use:
```shell
sudo apt-get install phantomjs
```
Otherwise (in case of 14.04.4 LTS)
install current PhantomJS, in my case using this command:
```shell
cd /tmp
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.6-linux-i686.tar.bz2
 2002  tar xjf phantomjs-1.9.6-linux-i686.tar.bz2 -C /opt/
```

> WARNING! Latest version 2.1.1 crashes on my Ubuntu 14.04.4 LTS 32-bit
> 1.9.6 seems to work fine.



Install NPM:

```shell
sudo apt-get install npm
```

In this directory run:

```shell
npm install
```
Ensure that this directory is available on your local server
as http://localhost/html5/knob_svg/. For example on Ubuntu
you may copy this projects files (html5) to /var/www/html/html5
and use suitable web server (apache2, nginx....)

Verify, that phantomjs is in your path:
```shell
env phantomjs --version
# in case of error
export PATH=/opt/phantomjs-1.9.6-linux-i686/bin:$PATH
env phantomjs --version
1.9.6
```

Run casperjs tests:

```shell
npm test
```


Go [Back to HTML5 projets](https://github.com/hpaluch/html5) page.

