# Scratch S2S

## The Grammar

Scratch code is transformed into an intermediary format that is then transformed into Javascript. The following describes the grammar for the intermediary language.

```
Digit -> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0
Num -> Digit | DigitNum
SNum -> Num | -Num
Start -> 'IFGREENFLAGCLICKED\n' | 'IF' key 'PRESSED\n'
Stm ->  'MOVE ' SNUM '\n'| 
        'TURN ' SNUM '\n'|
        'POINT ' SNUM '\n'|
        'GO TO ' SNUM' 'SNUM '\n'|
        'CHANGE X ' SNUM '\n'|
        'CHANGE Y ' SNUM '\n'|
        'SET X ' SNUM '\n'|
        'SET Y ' SNUM '\n'|
        IF Cond '\nBEGIN\n' Stm 'END\n' |
        IF Cond '\nBEGIN\n' Stm 'END\n' ELSE 'BEGIN\n' Stm 'END\n' |
        REPEAT NUM 'BEGIN\n' Stm 'END\n'
Cond -> Comp | Event
Event -> 'Touching Color' hex | 'Mouse Down' | 'Key Press' key
Comp -> Op '>' Op | Op '<' Op | Op '=' Op
Op -> 'Mouse X' | 'Mouse Y' | 'X Position' | 'Y Position' | SNum
Syntax -> Start Stm
```

## How To Use
You can either
1. Make a scratch project that adheres to the feature set in the grammar and pass it to the scratch tab and submit
2. Create the language syntax by following the grammar rules

## How To RUn
You can open and try the project by either opening `index.html` file or check the [online demo](https://logician724.github.io/scratch-s2s/)