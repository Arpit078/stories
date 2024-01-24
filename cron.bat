@echo off
setlocal EnableDelayedExpansion

REM Generate a random number between 0 and 92
set /a "n=!random! %% 93"

REM Create or overwrite the JavaScript file (no.js) with the generated constant
(
    echo const idx = !n!
) > no.js

echo "JavaScript file generated with const idx = !n!"
