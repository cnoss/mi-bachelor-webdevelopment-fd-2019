# Cranach Testdaten für den Frontend Development 

Die Anwendung wird aus den einzelnen Bestandteilen des `src` Verzeichnisses generiert und dann im `app` Verzeichnis gespeichert. Daher alle Änderungen **ausschließlich** unterhalb des **src** Verzeichnisses machen und die Änderungen im **app** Verzeichnis prüfen. Dazu muss die Anwendung via `gulp`generiert werden, oder Sie lassen via `gulp watch`oder `npm run watch` die ganze Zeit einen *Watcher* laufen, der bei jeder Änderung die Anwendung neu generiert.

## Getting Started

1. Abhängikeiten installieren via `npm install`
2. Anwendung initialisieren mit `npm run init` oder `gulp`
3. Watcher starten via `npm run watch` oder `gulp watch`


## Wurzelverzeichnis
Für den Webserver ist `app/` das Wurzelverzeichnis. Wer den *Live Server* von Visual Studio Code nutzt, sollte die `app/index.html` starten und alle anderen Seiten darüber navigieren. 

## Arbeitsverzeichnis
Alle Änderungen/Ergänzungen müssen unterhalb des `src` Verzeichnisses gemacht werden. Hierbei liegt folgende Verzeichnisstruktur zugrunde.

<pre>
src/fonts ....... die benötigten Schriftarten
src/html ........ die einzelnen HTML Files, ohne Header und Footer
src/images ...... ein paar Icons
src/js .......... die basalen Javascript Dateien
src/scss ........ alle notwendigen SASS Files
src/templates ... Vorlagen für Header und Footer
</pre>
