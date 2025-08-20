import React, { useState, useEffect, useMemo } from 'react';

// =============================================================================
// == Questions Data ==
// =============================================================================
const questions = [
    // Questions from cie-1 SK.docx
    {
        "question": "ಕನ್ನಡ ಭಾಷೆಯು ........................... ಭಾಷೆಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ .",
        "options": ["ಬ್ರಾಹ್ಮಿ", "ಸಂಸ್ಕೃತ", "ದ್ರಾವಿಡ", "ಪ್ರಾಕೃತ"],
        "answer": "ದ್ರಾವಿಡ"
    },
    {
        "question": "೬ನೇ ಶತಮಾನದ ಪಶ್ಚಿಮ ಗಂಗ ಸಾಮ್ರಾಜ್ಯದ ಕಾಲದಲ್ಲಿ ಮತ್ತು ......................... ,ಶತಮಾನದ ........................... ಸಾಮ್ರಾಜ್ಯದ ಕಾಲದಲ್ಲಿ ಹಳಗನ್ನಡ ಸಾಹಿತ್ಯ ,ರಾಜಾಶ್ರಯ ಪಡೆಯಿತು .",
        "options": ["೯ನೇ - ರಾಷ್ಟ್ರಕೂಟ", "೧೨ನೇ - ರಾಷ್ಟ್ರಕೂಟ", "೯ನೇ - ಕದಂಬರ", "೧೦ನೇ - ಚೋಳ"],
        "answer": "೯ನೇ - ರಾಷ್ಟ್ರಕೂಟ(9th Century )"
    },
    {
        "question": "ಪ್ರತಿಯೊಂದು ಭಾಷೆಗೂ ತನ್ನದೇ ಆದ ................................ ......................... ಇದೆ .",
        "options": ["ಸಂಸ್ಕೃತಿ / ಪರಂಪರೆ", "ಲಿಪಿ / ವ್ಯಾಕರಣ", "ಇತಿಹಾಸ / ಭೂಗೋಳ", "ಧ್ವನಿ / ಅಕ್ಷರ"],
        "answer": "ಸಂಸ್ಕೃತಿ / ಪರಂಪರೆ"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷೆಯು ಸುಮಾರು ..................... ವರ್ಷಗಳ ಇತಿಹಾಸವನ್ನು ಹೊಂದಿದೆ.",
        "options": ["೨೦೦೦", "೧೫೦೦", "೨೫೦೦", "೧೦೦೦"],
        "answer": "೨೦೦೦"
    },
    {
        "question": "ಕನ್ನಡ ಸಾಹಿತ್ಯಕ್ಕೆ ..................... ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿಗಳು ಲಭಿಸಿವೆ.",
        "options": ["೮", "೭", "೯", "೬"],
        "answer": "೮"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷೆಯ ಬೆಳವಣಿಗೆಯನ್ನು ..................... ಹಂತಗಳಾಗಿ ವಿಂಗಡಿಸಲಾಗಿದೆ.",
        "options": ["ಮೂರು", "ನಾಲ್ಕು", "ಎರಡು", "ಐದು"],
        "answer": "ಮೂರು"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಕೃತಿ .....................",
        "options": ["ಕವಿರಾಜಮಾರ್ಗ", "ವಿಕ್ರಮಾರ್ಜುನ ವಿಜಯ", "ಆದಿಪುರಾಣ", "ಶಬ್ದಮಣಿದರ್ಪಣ"],
        "answer": "ಕವಿರಾಜಮಾರ್ಗ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಶಾಸನ .....................",
        "options": ["ಹಲ್ಮಿಡಿ", "ಬಾದಾಮಿ", "ಶ್ರವಣಬೆಳಗೊಳ", "ತಲಕಾಡು"],
        "answer": "ಹಲ್ಮಿಡಿ"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷೆಯು ಭಾರತದ ..................... ನೇ ಸ್ಥಾನದಲ್ಲಿದೆ.",
        "options": ["೨೨", "೧೮", "೧೬", "೨೦"],
        "answer": "೨೨"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಪತ್ರಿಕೆ .....................",
        "options": ["ಮಂಗಳೂರು ಸಮಾಚಾರ", "ಪ್ರಜಾವಾಣಿ", "ವಿಜಯ ಕರ್ನಾಟಕ", "ಉದಯವಾಣಿ"],
        "answer": "ಮಂಗಳೂರು ಸಮಾಚಾರ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ವ್ಯಾಕರಣ ಗ್ರಂಥ .....................",
        "options": ["ಶಬ್ದಮಣಿದರ್ಪಣ", "ಕವಿರಾಜಮಾರ್ಗ", "ಛಂದೋಂಬುಧಿ", "ಕರ್ಣಾಟ ಭಾಷಾ ಭೂಷಣ"],
        "answer": "ಶಬ್ದಮಣಿದರ್ಪಣ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ನಾಟಕ .....................",
        "options": ["ಮಿತ್ರಾವಿಂದಾ ಗೋವಿಂದ", "ಯಯಾತಿ", "ತುಘಲಕ್", "ಸಂಕ್ರಾಂತಿ"],
        "answer": "ಮಿತ್ರಾವಿಂದಾ ಗೋವಿಂದ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಕವಯಿತ್ರಿ .....................",
        "options": ["ಅಕ್ಕಮಹಾದೇವಿ", "ಸಾಂಚಿ ಹೊನ್ನಮ್ಮ", "ಹೆಳವನಕಟ್ಟೆ ಗಿರಿಯಮ್ಮ", "ರತ್ನಾಕರವರ್ಣಿ"],
        "answer": "ಅಕ್ಕಮಹಾದೇವಿ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಕಾದಂಬರಿ .....................",
        "options": ["ಇಂದಿರಾಬಾಯಿ", "ಚೋಮನ ದುಡಿ", "ಮರಳಿ ಮಣ್ಣಿಗೆ", "ಬೆಟ್ಟದ ಜೀವ"],
        "answer": "ಇಂದಿರಾಬಾಯಿ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಾಕಾವ್ಯ .....................",
        "options": ["ಪಂಪಭಾರತ", "ಗಿರಿಜಾ ಕಲ್ಯಾಣ", "ಯಶೋಧರ ಚರಿತೆ", "ರಾಮಾಯಣ ದರ್ಶನಂ"],
        "answer": "ಪಂಪಭಾರತ"
    },
    {
        "question": "Is Vishwa the Goat??",
        "options": ["Yes", "No", "I'm a hater", "I love him"],
        "answer": "Yes"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ವಿಜೇತರು .....................",
        "options": ["ಕುವೆಂಪು", "ದ.ರಾ.ಬೇಂದ್ರೆ", "ಶಿವರಾಮ ಕಾರಂತ", "ಮಾಸ್ತಿ ವೆಂಕಟೇಶ ಅಯ್ಯಂಗಾರ್"],
        "answer": "ಕುವೆಂಪು"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ರಾಜವಂಶ (please google this answer).....................",
        "options": ["ಗಂಗರು", "ಕದಂಬರು", "ಚಾಲುಕ್ಯರು", "ರಾಷ್ಟ್ರಕೂಟರು"],
        "answer": "ಗಂಗರು"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ವಿಶ್ವವಿದ್ಯಾಲಯ .....................",
        "options": ["ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಕರ್ನಾಟಕ ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಕನ್ನಡ ವಿಶ್ವವಿದ್ಯಾಲಯ"],
        "answer": "ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಚಿತ್ರ .....................",
        "options": ["ಸತಿ ಸುಲೋಚನಾ", "ಭಕ್ತ ಧ್ರುವ", "ಗುಬ್ಬಿ ವೀರಣ್ಣ", "ರಾಜಾ ಹರಿಶ್ಚಂದ್ರ"],
        "answer": "ಸತಿ ಸುಲೋಚನಾ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ದಿನಪತ್ರಿಕೆ .....................",
        "options": ["ಸಂಯುಕ್ತ ಕರ್ನಾಟಕ", "ಪ್ರಜಾವಾಣಿ", "ಕನ್ನಡಪ್ರಭ", "ವಿಜಯವಾಣಿ"],
        "answer": "ಸಂಯುಕ್ತ ಕರ್ನಾಟಕ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ಮುಖ್ಯಮಂತ್ರಿ .....................",
        "options": ["ಯಾರೂ ಇಲ್ಲ", "ಸರೋಜಿನಿ ಮಹಿಷಿ", "ಲೀಲಾವತಿ ವಿ. ಶೆಟ್ಟಿ", "ಮೋಟಮ್ಮ"],
        "answer": "ಯಾರೂ ಇಲ್ಲ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ರಾಜ್ಯಪಾಲರು .....................",
        "options": ["ವಿ.ಎಸ್. ರಮಾದೇವಿ", "ಪ್ರತಿಭಾ ಪಾಟೀಲ್", "ಪದ್ಮಜಾ ನಾಯ್ಡು", "ಶಾರದಾ ಮುಖರ್ಜಿ"],
        "answer": "ವಿ.ಎಸ್. ರಮಾದೇವಿ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ಸಚಿವರು .....................",
        "options": ["ಗ್ರೇಸ್ ಟಕ್ಕರ್", "ಯಶೋಧರಾ ದಾಸಪ್ಪ", "ನಾಗಮ್ಮ ಕೇಶವಮೂರ್ತಿ", "ಇ. ಈ. ವಾಝ್"],
        "answer": "ಗ್ರೇಸ್ ಟಕ್ಕರ್"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ನ್ಯಾಯಾಧೀಶರು .....................",
        "options": ["ಮಂಜುಳಾ ಚೆಲ್ಲೂರ್", "ಬಿ.ವಿ. ನಾಗರತ್ನ", "ಚಂದ್ರಕಾಂತಾ ಅರಸ್", "ಆರ್. ಬಾನುಮತಿ"],
        "answer": "ಮಂಜುಳಾ ಚೆಲ್ಲೂರ್"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ಕುಲಪತಿ .....................",
        "options": ["ಜ್ಯೋತಿ ಕೆ. ಔದೆ", "ಗೀತಾ ಬಾಲಿ", "ಪಿ. ಸುಶೀಲಾ", "ದೇವಿ ಶೆಟ್ಟಿ"],
        "answer": "ಜ್ಯೋತಿ ಕೆ. ಔದೆ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ಐ.ಎ.ಎಸ್. ಅಧಿಕಾರಿ .....................",
        "options": ["ರೇಖಾ ರಾಣಿ", "ಬಿ.ಎಸ್. ರೇಣುಕಾ", "ವಂದಿತಾ ಶರ್ಮಾ", "ಶಾಲಿನಿ ರಜನೀಶ್"],
        "answer": "ರೇಖಾ ರಾಣಿ"
    },
    {
        "question": "ಕನ್ನಡದ ಮೊದಲ ಮಹಿಳಾ ಐ.ಪಿ.ಎಸ್. ಅಧಿಕಾರಿ .....................",
        "options": ["ನೀಲಮಣಿ ಎನ್. ರಾಜು", "ಡಿ. ರೂಪಾ", "ಸೋನಿಯಾ ನಾರಂಗ್", "ಇಶಾ ಪಂತ್"],
        "answer": "ನೀಲಮಣಿ ಎನ್. ರಾಜು"
    },
    {
        "question": "ಕಾಲ ಪದದ ಅರ್ಥ",
        "options": ["ಭವಿಷ್ಯತ್", "ಭೂತ", "ವರ್ತಮಾನ", "ಸಮಯ"],
        "answer": "ಸಮಯ"
    },
    {
        "question": " ಹದ್ದು ಪದದ ನಾನಾರ್ಥಕವಿದು.",
        "options": ["ಪಕ್ಷಿ, ಗಡಿ", "ಪಾರಿವಾಳ, ಸರಿಹದ್ದು", "ನಿಶಬ್ಧ, ಗಡಿ", "ಹಕ್ಕಿ, ಮೇರೆ"],
        "answer": "ಪಕ್ಷಿ, ಗಡಿ"
    },
    {
        "question": "Secretary ಎಂದರೆ .......................",
        "options": ["ಸಚಿವ", "ಮುಖ್ಯ", "ಕಾರ್ಯದರ್ಶಿ", "ಅಧ್ಯಕ್ಷ"],
        "answer": "ಕಾರ್ಯದರ್ಶಿ"
    },
    // Questions from RVCE CIE-2 SK (1).docx
    {
        "question": "ಎ.ಎನ್.ಮೂರ್ತಿರಾವ್ ಅವರ ಆತ್ಮಕಥೆ .......................",
        "options": ["ಮಿನುಗು-ಮಿಂಚು", "ಲಲಿತ ಪ್ರಬಂಧ", "ಸಂಜೆಗಣ್ಣಿನ ಹಿನ್ನೋಟ", "ದೇವರು"],
        "answer": "ಸಂಜೆಗಣ್ಣಿನ ಹಿನ್ನೋಟ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರಲ್ಲಿ ........................ ಸಂಸ್ಕೃತಿಯ ಪ್ರಭಾವ ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಯಿತಲ್ಲವೇ? ಎಂಬ ಸಂದೇಹವನ್ನು ಹಲವರು ವ್ಯಕ್ತಪಡಿಸಿದ್ದಾರೆ.",
        "options": ["ಪಾಶ್ಚಾತ್ಯ", "ಹಿಂದು", "ಎಲ್ಲಾ", "ಭಾರತೀಯ"],
        "answer": "ಪಾಶ್ಚಾತ್ಯ"
    },
    {
        "question": "\" ನಿಮಗೆ ಶಕ್ತಿಯಿದೆಯೇ? ಅಂತ ನಾನು ಕೇಳುತ್ತಿಲ್ಲ, ಇದೆ ಅಂತ ಹೇಳುತ್ತಿದ್ದೇನೆ . - ಈ ಮಾತನ್ನು ಯಾರು-ಯಾರಿಗೆ ಹೇಳಿದರು.\"",
        "options": ["ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು - ಯುವಕನಿಗೆ", "ಯುವಕ - ವಿಶ್ವೇಶ್ವರಯ್ಯನವರಿಗೆ", "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು - ಜನರಿಗೆ", "ಜನರು - ವಿಶ್ವೇಶ್ವರಯ್ಯನವರಿಗೆ"],
        "answer": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು - ಯುವಕನಿಗೆ"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿರುವ ಒಟ್ಟು ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯಗಳು .....................",
        "options": ["ಏಳು", "ಆರು", "ಎಂಟು", "ಒಂಬತ್ತು"],
        "answer": "ಏಳು"
    },
    {
        "question": "Does Tushar love men?",
        "options": ["No", "Bro is straight", "Yes", "Donno"],
        "answer": "Yes"
    },
    {
        "question": "ಮರದಿಂದ : ಇಲ್ಲಿರುವ ವಿಭಕ್ತಿ ಪ್ರತ್ಯಯವನ್ನು ಹೆಸರಿಸಿ.",
        "options": ["ತೃತೀಯಾ", "ಚತುರ್ಥಿ", "ಪಂಚಮಿ", "ಷಷ್ಠಿ"],
        "answer": "ತೃತೀಯಾ"
    },
    {
        "question": "ಮನೆ ಪದದ ಬಹುವಚನ ರೂಪ .....................",
        "options": ["ಮನೆಗಳು", "ಮನೆಯನ್ನು", "ಮನೆಯಿಂದ", "ಮನೆಯಲ್ಲಿ"],
        "answer": "ಮನೆಗಳು"
    },
    {
        "question": "ದೇವರು ಪದದ ಬಹುವಚನ ರೂಪ .....................",
        "options": ["ದೇವರುಗಳು", "ದೇವರು", "ದೇವತೆಗಳು", "ದೇವ"],
        "answer": "ದೇವರುಗಳು"
    },
    {
        "question": "ಹೂವು ಪದದ ಬಹುವಚನ ರೂಪ .....................",
        "options": ["ಹೂವುಗಳು", "ಹೂಗಳು", "ಹೂವಿಂದ", "ಹೂವಿನಲ್ಲಿ"],
        "answer": "ಹೂವುಗಳು"
    },
    {
        "question": "ತಾಯಿ ಪದದ ಬಹುವಚನ ರೂಪ .....................",
        "options": ["ತಾಯಂದಿರು", "ತಾಯಿಯರು", "ತಾಯಿಗಳು", "ತಾಯಂದರು"],
        "answer": "ತಾಯಂದಿರು"
    },
    {
        "question": "ಅರಸ ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ಅರಸಿ", "ರಾಣಿ", "ದೊರೆಸಾನಿ", "ಮಹಾರಾಣಿ"],
        "answer": "ಅರಸಿ"
    },
    {
        "question": "ಅವನು ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ಅವಳು", "ಆಕೆ", "ಇವಳು", "ಈಕೆ"],
        "answer": "ಅವಳು"
    },
    {
        "question": "ರಾಜ ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ರಾಣಿ", "ರಾಜ್ಞಿ", "ದೊರೆಸಾನಿ", "ಮಹಾರಾಣಿ"],
        "answer": "ರಾಣಿ"
    },
    {
        "question": "ದೊರೆ ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ದೊರೆಸಾನಿ", "ರಾಣಿ", "ಅರಸಿ", "ಮಹಾರಾಣಿ"],
        "answer": "ದೊರೆಸಾನಿ"
    },
    {
        "question": "ಹುಡುಗ ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ಹುಡುಗಿ", "ಬಾಲಕಿ", "ಹೆಣ್ಣು", "ಕನ್ಯೆ"],
        "answer": "ಹುಡುಗಿ"
    },
    {
        "question": "ಗೆಳೆಯ ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ಗೆಳತಿ", "ಸ್ನೇಹಿತೆ", "ಸಖಿ", "ಮಿತ್ರಳು"],
        "answer": "ಗೆಳತಿ"
    },
    {
        "question": "ಸಹೋದ್ಯೋಗಿ ಪದದ ಸ್ತ್ರೀಲಿಂಗ ರೂಪ .....................",
        "options": ["ಸಹೋದ್ಯೋಗಿನಿ", "ಸಹೋದ್ಯೋಗಿ", "ಸಹೋದ್ಯೋಗಿಗಳು", "ಸಹೋದ್ಯೋಗ"],
        "answer": "ಸಹೋದ್ಯೋಗಿನಿ"
    },
    {
        "question": "ಹಣತೆ ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ಸ್ತ್ರೀಲಿಂಗ", "ಪುಲ್ಲಿಂಗ", "ನಪುಂಸಕಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ಸ್ತ್ರೀಲಿಂಗ"
    },
    {
        "question": "ಮಗು ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ನಪುಂಸಕಲಿಂಗ", "ಸ್ತ್ರೀಲಿಂಗ", "ಪುಲ್ಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ನಪುಂಸಕಲಿಂಗ"
    },
    {
        "question": "Who gets repelled from Venkata Narasimha SWAMY?",
        "options": ["Everyone", "Men", "Nobody, we love swamy", "Women"],
        "answer": "Women"
    },
    {
        "question": "ಶಿಕ್ಷಕ ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ಪುಲ್ಲಿಂಗ", "ಸ್ತ್ರೀಲಿಂಗ", "ನಪುಂಸಕಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ಪುಲ್ಲಿಂಗ"
    },
    {
        "question": "ವಿದ್ಯಾರ್ಥಿ ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ಪುಲ್ಲಿಂಗ", "ಸ್ತ್ರೀಲಿಂಗ", "ನಪುಂಸಕಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ಪುಲ್ಲಿಂಗ"
    },
    {
        "question": "ಹಸು ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ಸ್ತ್ರೀಲಿಂಗ", "ಪುಲ್ಲಿಂಗ", "ನಪುಂಸಕಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ಸ್ತ್ರೀಲಿಂಗ"
    },
    {
        "question": "ಕವಿ ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ಪುಲ್ಲಿಂಗ", "ಸ್ತ್ರೀಲಿಂಗ", "ನಪುಂಸಕಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ಪುಲ್ಲಿಂಗ"
    },
    {
        "question": "ನದಿ ಪದದ ಲಿಂಗವನ್ನು ಗುರುತಿಸಿ.",
        "options": ["ಸ್ತ್ರೀಲಿಂಗ", "ಪುಲ್ಲಿಂಗ", "ನಪುಂಸಕಲಿಂಗ", "ಉಭಯಲಿಂಗ"],
        "answer": "ಸ್ತ್ರೀಲಿಂಗ"
    },
    {
        "question": " ಮೂಡಣ ಪದದ ವಿರುದ್ಧಾರ್ಥಕ ರೂಪ .........................",
        "options": ["ಪಡುವಣ", "ತೆಂಕಣ", "ದಿಕ್ಕು", "ಬಡಗಣ"],
        "answer": "ಪಡುವಣ"
    },
    {
        "question": " ತೊರೆ ಪದದ ನಾನಾರ್ಥಕಗಳು : .....................",
        "options": ["ಬಿಟ್ಟು ಬಿಡು , ಹೊಳೆ", "ಹೊಳೆ , ಸಂಪರ್ಕಿಸು", "ಬಿಟ್ಟು ಬಿಡು , ಸಮುದ್ರ", "ನದಿ, ತ್ಯಜಿಸು"],
        "answer": "ಬಿಟ್ಟು ಬಿಡು , ಹೊಳೆ"
    },
    {
        "question": "\"\"\" Receipt \"\" ಈ ಆ0ಗ್ಲ ಪದದ ಕನ್ನಡ ರೂಪ ........................",
        "options": ["ಅಂಗೀಕಾರ", "ರಸೀದಿ", "ಪತ್ರ", "ಸ್ವೀಕೃತಿ"],
        "answer": "ರಸೀದಿ"
    },
    // Questions from cie-1 SK - LRK.docx
    {
        "question": "ಕರ್ನಾಟಕ ರಾಜ್ಯದ ಮೊದಲ ಮುಖ್ಯಮಂತ್ರಿ ..................",
        "options": ["ನಿಜಲಿಂಗಪ್ಪ", "ರಾಮಕೃಷ್ಣಹೆಗಡೆ", "ಕೆ . ಚಂಗಲರಾಯರೆಡ್ಡಿ", "ದೇವರಾಜ ಅರಸ್"],
        "answer": "ಕೆ . ಚಂಗಲರಾಯರೆಡ್ಡಿ"
    },
    {
        "question": "೧೯೭೪ರಲ್ಲಿ ಕನ್ನಡ ಭಾಷೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನೀಡಿದ ತೀರ್ಪಿನ ರೂಪ .......................... ಎಂಬುದಾಗಿತ್ತು .",
        "options": ["ಜ್ಯುಡಿಷಿಯಲ್ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ನ್ಯಾಯಾಲಯದ ಭಾಷೆ ಮತ್ತು ವಾದ ಕನ್ನಡದಲ್ಲೇ ಇರಬೇಕು .", "ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯದ ಭಾಷೆ ಆಂಗ್ಲ ಭಾಷೆಯಾಗಿರಬೇಕು .", "ಅಂತರ ರಾಷ್ಟ್ರೀಯ ಭಾಷೆಯಾಗಿರಬೇಕು .", "ಕನ್ನಡವನ್ನು ಆಡಳಿತ ಭಾಷೆಯಾಗಿ ಬಳಸಬೇಕು."],
        "answer": "ಜ್ಯುಡಿಷಿಯಲ್ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ನ್ಯಾಯಾಲಯದ ಭಾಷೆ ಮತ್ತು ವಾದ ಕನ್ನಡದಲ್ಲೇ ಇರಬೇಕು ."
    },
    {
        "question": "ಆಡಳಿತ ಭಾಷೆ  ಎಂದರೆ ........................",
        "options": ["ರಾಜ್ಯದ ಆಡಳಿತದಲ್ಲಿ ಬಳಸುವ ಭಾಷೆ", "ಕೇಂದ್ರ ಸರ್ಕಾರದ ಭಾಷೆ", "ನ್ಯಾಯಾಲಯದ ಭಾಷೆ", "ಶಾಲಾ-ಕಾಲೇಜುಗಳ ಭಾಷೆ"],
        "answer": "ರಾಜ್ಯದ ಆಡಳಿತದಲ್ಲಿ ಬಳಸುವ ಭಾಷೆ"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಆಡಳಿತ ಭಾಷೆಯನ್ನಾಗಿ ಜಾರಿಗೆ ತಂದ ವರ್ಷ .....................",
        "options": ["೧೯೬೩", "೧೯೫೬", "೧೯೭೩", "೧೯೮೦"],
        "answer": "೧೯೬೩"
    },
    {
        "question": "ಕನ್ನಡ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರವನ್ನು ಸ್ಥಾಪಿಸಿದ ವರ್ಷ .....................",
        "options": ["೧೯೯೪", "೧೯೮೩", "೨೦೦೧", "೧೯೯೦"],
        "answer": "೧೯೯೪"
    },
    {
        "question": "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತನ್ನು ಸ್ಥಾಪಿಸಿದ ವರ್ಷ .....................",
        "options": ["೧೯೧೫", "೧೯೦೫", "೧೯೨೫", "೧೯೩೫"],
        "answer": "೧೯೧೫"
    },
    {
        "question": "ಕನ್ನಡ ಮತ್ತು ಸಂಸ್ಕೃತಿ ಇಲಾಖೆಯನ್ನು ಸ್ಥಾಪಿಸಿದ ವರ್ಷ .....................",
        "options": ["೧೯೭೭", "೧967", "೧೯೮೭", "೧೯೯೭"],
        "answer": "೧೯೭೭"
    },
    {
        "question": "ಕನ್ನಡ ವಿಶ್ವವಿದ್ಯಾಲಯವನ್ನು ಸ್ಥಾಪಿಸಿದ ವರ್ಷ .....................",
        "options": ["೧೯೯೧", "೧೯೮೧", "೨೦೦೧", "೧೯೭೧"],
        "answer": "೧೯೯೧"
    },
    {
        "question": "ಕುವೆಂಪು ಭಾಷಾ ಭಾರತಿ ಪ್ರಾಧಿಕಾರವನ್ನು ಸ್ಥಾಪಿಸಿದ ವರ್ಷ .....................",
        "options": ["೨೦೦೬", "೧೯೯೬", "೨೦೧೬", "೧೯೮೬"],
        "answer": "೨೦೦೬"
    },
    {
        "question": "ಕನ್ನಡ ಕಾಯಕ ವರ್ಷ ಎಂದು ಘೋಷಿಸಿದ ವರ್ಷ .....................",
        "options": ["೨೦೨೦-೨೧", "೨೦೧೯-೨೦", "೨೦೨೧-೨೨", "೨೦೧೮-೧೯"],
        "answer": "೨೦೨೦-೨೧"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷಾ ಮಸೂದೆಯನ್ನು ಮಂಡಿಸಿದ ವರ್ಷ .....................",
        "options": ["೨೦೨೨", "೨೦೨೦", "೨೦೨೧", "೨೦೧೯"],
        "answer": "೨೦೨೨"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷಾ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ ವಿಧೇಯಕವನ್ನು ಮಂಡಿಸಿದವರು .....................",
        "options": ["ಸುನೀಲ್ ಕುಮಾರ್", "ಬಸವರಾಜ ಬೊಮ್ಮಾಯಿ", "ಸಿದ್ದರಾಮಯ್ಯ", "ಎಚ್.ಡಿ. ಕುಮಾರಸ್ವಾಮಿ"],
        "answer": "ಸುನೀಲ್ ಕುಮಾರ್"
    },
    {
        "question": "ಕನ್ನಡ ಭಾಷಾ ಕಾಯಿದೆಯನ್ನು ಜಾರಿಗೆ ತಂದ ಮುಖ್ಯಮಂತ್ರಿ .....................",
        "options": ["ದೇವರಾಜ ಅರಸ್", "ರಾಮಕೃಷ್ಣ ಹೆಗಡೆ", "ಎಸ್. ನಿಜಲಿಂಗಪ್ಪ", "ಬಂಗಾರಪ್ಪ"],
        "answer": "ದೇವರಾಜ ಅರಸ್"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ತೀರ್ಪು ನೀಡಿದ ಮೊದಲ ನ್ಯಾಯಾಧೀಶರು .....................",
        "options": ["ಎನ್.ಡಿ. ವೆಂಕಟೇಶ್", "ಇ.ಎಸ್. ವೆಂಕಟರಾಮಯ್ಯ", "ಎಂ.ಎನ್. ವೆಂಕಟಾಚಲಯ್ಯ", "ಶಿವರಾಜ್ ಪಾಟೀಲ್"],
        "answer": "ಎನ್.ಡಿ. ವೆಂಕಟೇಶ್"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ವಾದ ಮಂಡಿಸಿದ ಮೊದಲ ವಕೀಲರು .....................",
        "options": ["ಎ.ಎನ್. ಜಯರಾಂ", "ಸಿ.ಕೆ. ದಫ್ತರಿ", "ಎಂ.ಸಿ. ಚಾಗ್ಲಾ", "ಎಚ್.ಎಂ. ಸೀರ್ವಾಯಿ"],
        "answer": "ಎ.ಎನ್. ಜಯರಾಂ"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ಕಾನೂನು ಪದಕೋಶವನ್ನು ರಚಿಸಿದವರು .....................",
        "options": ["ಎಲ್. ಗುಂಡಪ್ಪ", "ಡಿ.ವಿ. ಗುಂಡಪ್ಪ", "ಮಾಸ್ತಿ ವೆಂಕಟೇಶ ಅಯ್ಯಂಗಾರ್", "ಕುವೆಂಪು"],
        "answer": "ಎಲ್. ಗುಂಡಪ್ಪ"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ಕಾನೂನು ಸಾಹಿತ್ಯವನ್ನು ರಚಿಸಿದವರು .....................",
        "options": ["ಎನ್. ಬಾಲಸುಬ್ರಹ್ಮಣ್ಯಂ", "ಕೆ.ಟಿ.ಎಸ್. ತುಳಸಿ", "ಫಾಲಿ ನಾರಿಮನ್", "ರಾಮ್ ಜೇಠ್ಮಲಾನಿ"],
        "answer": "ಎನ್. ಬಾಲಸುಬ್ರಹ್ಮಣ್ಯಂ"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ಕಾನೂನು ಪತ್ರಿಕೆಯನ್ನು ಆರಂಭಿಸಿದವರು .....................",
        "options": ["ಟಿ.ಎ.ಎಸ್. ಕೃಷ್ಣಮೂರ್ತಿ", "ಪಿ. ಕೋದಂಡರಾಮಯ್ಯ", "ಎ.ಎನ್. ಮೂರ್ತಿರಾವ್", "ಎಂ. ವೆಂಕಟಕೃಷ್ಣಯ್ಯ"],
        "answer": "ಟಿ.ಎ.ಎಸ್. ಕೃಷ್ಣಮೂರ್ತಿ"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ಕಾನೂನು ಶಿಕ್ಷಣವನ್ನು ಆರಂಭಿಸಿದವರು .....................",
        "options": ["ಆಳ್ವಾರ್ ತಿರುಮಲೈ ಅಯ್ಯಂಗಾರ್", "ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್", "ಮಹಾತ್ಮಾ ಗಾಂಧಿ", "ಜವಾಹರಲಾಲ್ ನೆಹರು"],
        "answer": "ಆಳ್ವಾರ್ ತಿರುಮಲೈ ಅಯ್ಯಂಗಾರ್"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ನ್ಯಾಯಾಂಗ ಸುಧಾರಣೆಗಳನ್ನು ತಂದವರು .....................",
        "options": ["ದಿವಾನ್ ರಂಗಾಚಾರ್ಲು", "ದಿವಾನ್ ಪೂರ್ಣಯ್ಯ", "ಸರ್. ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್"],
        "answer": "ದಿವಾನ್ ರಂಗಾಚಾರ್ಲು"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ಮೊದಲ ಕಾನೂನು ಕಾಲೇಜು ಸ್ಥಾಪನೆಯಾದ ಸ್ಥಳ .....................",
        "options": ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ಧಾರವಾಡ", "ಮಂಗಳೂರು"],
        "answer": "ಬೆಂಗಳೂರು"
    },
    {
        "question": "ಕನ್ನಡದಲ್ಲಿ ಮೊದಲ ಕಾನೂನು ಪದವಿ ನೀಡಿದ ವಿಶ್ವವಿದ್ಯಾಲಯ .....................",
        "options": ["ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಕರ್ನಾಟಕ ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಕನ್ನಡ ವಿಶ್ವವಿದ್ಯಾಲಯ"],
        "answer": "ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ"
    },
    {
        "question": "\"\"ಅನುವಾದ\"\" ಪದದ ಅರ್ಥ .......................................",
        "options": ["ಭಾಷಾಂತರ", "ಅನುಕರಿಸು", "ವಾದಮಾಡು", "ಪ್ರತಿწერა"],
        "answer": "ಭಾಷಾಂತರ"
    },
    {
        "question": "೨೦೨೪ರಲ್ಲಿ ನಡೆದ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸಮ್ಮೇಳನವು .......................... ಜರುಗಿತು .",
        "options": ["ಹಾಸನದಲ್ಲಿ", "ಮಂಡ್ಯದಲ್ಲಿ", "ಮೈಸೂರಿನಲ್ಲಿ", "ಬೆಂಗಳೂರಿನಲ್ಲಿ"],
        "answer": "ಮಂಡ್ಯದಲ್ಲಿ"
    },
    {
        "question": "ಆಯ್ದಕ್ಕಿ ಮಾರಯ್ಯನವರ ಪ್ರಕಾರ ತ್ರಿವಿಧಗಳು ಯಾವುವು ?",
        "options": ["ಗುರು , ಲಿಂಗ , ಜಂಗಮ", "ಗುರು , ಲಿಂಗ , ಶರಣೆ", "ಗುರು , ಶಕ್ತಿ , ವಚನ", "ಕಾಯ, ವಾಚ, ಮನಸ"],
        "answer": "ಗುರು , ಲಿಂಗ , ಜಂಗಮ"
    },
    // Questions from RVCE CIE-2 SK (2).docx
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ಯಾವುದೇ ಕೆಲಸಕ್ಕಾಗಲಿ .................... ಇಲ್ಲದೆ ಕೈ ಹಾಕುತ್ತಿರಲಿಲ್ಲ.",
        "options": ["ಮುಂದಾಲೋಚನೆ", "ಪೂರ್ವ ಸಿದ್ಧತೆ", "ಶಿಸ್ತು", "ಹಣ"],
        "answer": "ಪೂರ್ವ ಸಿದ್ಧತೆ"
    },
    {
        "question": " ಕಲರವ \"\" ಪದದ ಅರ್ಥ ..............................\"",
        "options": ["ಮಧುರವಾದ ಧ್ವನಿ", "ಕರ್ಕಶ ಧ್ವನಿ", "ಗಟ್ಟಿಯಾದ ಕೂಗು", "ಅಳು"],
        "answer": "ಮಧುರವಾದ ಧ್ವನಿ"
    },
    {
        "question": " ದಿವಾನ ಪದದ ಸಮಾನಾರ್ಥಕ ಪದಗಳು ..........................",
        "options": ["ರಾಜ , ಸೈನಿಕ", "ಮಂತ್ರಿ , ರಾಜ", "ಮಂತ್ರಿ , ಸಚಿವ", "ಪ್ರಧಾನಿ, ರಾಜ"],
        "answer": "ಮಂತ್ರಿ , ಸಚಿವ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ..................... ಎಂಬ ತತ್ವವನ್ನು ತಮ್ಮ ಜೀವನದಲ್ಲಿ ಅಳವಡಿಸಿಕೊಂಡಿದ್ದರು.",
        "options": ["ದುಡಿಮೆಯೇ ದೇವರು", "ಸತ್ಯಮೇವ ಜಯತೆ", "ಅಹಿಂಸಾ ಪರಮೋ ಧರ್ಮಃ", "ಜನಸೇವೆಯೇ ಜನಾರ್ದನ ಸೇವೆ"],
        "answer": "ದುಡಿಮೆಯೇ ದೇವರು"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ..................... ರವರೆಗೆ ಬದುಕಿದ್ದರು.",
        "options": ["೧೦೨ ವರ್ಷ", "೧೦೦ ವರ್ಷ", "೯೮ ವರ್ಷ", "೧೦೫ ವರ್ಷ"],
        "answer": "೧೦೨ ವರ್ಷ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ..................... ರಲ್ಲಿ ಜನಿಸಿದರು.",
        "options": ["೧೮೬೧", "೧೮೫೧", "೧೮೭೧", "೧೮೮೧"],
        "answer": "೧೮೬೧"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ಜನ್ಮಸ್ಥಳ .....................",
        "options": ["ಮುದ್ದೇನಹಳ್ಳಿ", "ಕೋಲಾರ", "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", "ಬೆಂಗಳೂರು"],
        "answer": "ಮುದ್ದೇನಹಳ್ಳಿ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ತಂದೆಯ ಹೆಸರು .....................",
        "options": ["ಶ್ರೀನಿವಾಸ ಶಾಸ್ತ್ರಿ", "ವೆಂಕಟಲಕ್ಷ್ಮಮ್ಮ", "ರಾಮಯ್ಯ", "ಕೃಷ್ಣಯ್ಯ"],
        "answer": "ಶ್ರೀನಿವಾಸ ಶಾಸ್ತ್ರಿ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ತಾಯಿಯ ಹೆಸರು .....................",
        "options": ["ವೆಂಕಟಲಕ್ಷ್ಮಮ್ಮ", "ಸೀತಮ್ಮ", "ಲಕ್ಷ್ಮಮ್ಮ", "ಪಾರ್ವತಮ್ಮ"],
        "answer": "ವೆಂಕಟಲಕ್ಷ್ಮಮ್ಮ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ..................... ವಿಷಯದಲ್ಲಿ ಪದವಿ ಪಡೆದರು.",
        "options": ["ಎಂಜಿನಿಯರಿಂಗ್", "ವೈದ್ಯಕೀಯ", "ಕಾನೂನು", "ಕಲೆ"],
        "answer": "ಎಂಜಿನಿಯರಿಂಗ್"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ..................... ಸಂಸ್ಥೆಯನ್ನು ಸ್ಥಾಪಿಸಿದರು.",
        "options": ["ಮೈಸೂರು ಬ್ಯಾಂಕ್", "ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ", "ಕೆನರಾ ಬ್ಯಾಂಕ್", "ವಿಜಯಾ ಬ್ಯಾಂಕ್"],
        "answer": "ಮೈಸೂರು ಬ್ಯಾಂಕ್"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರು ..................... ಅಣೆಕಟ್ಟನ್ನು ನಿರ್ಮಿಸಿದರು.",
        "options": ["ಕೃಷ್ಣರಾಜಸಾಗರ", "ತುಂಗಭದ್ರಾ", "ಆಲಮಟ್ಟಿ", "ಭದ್ರಾ"],
        "answer": "ಕೃಷ್ಣರಾಜಸಾಗರ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರಿಗೆ ..................... ಪ್ರಶಸ್ತಿ ಲಭಿಸಿತು.",
        "options": ["ಭಾರತ ರತ್ನ", "ಪದ್ಮ ವಿಭೂಷಣ", "ಪದ್ಮ ಭೂಷಣ", "ಜ್ಞಾನಪೀಠ"],
        "answer": "ಭಾರತ ರತ್ನ"
    },
    {
        "question": "ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ಜನ್ಮದಿನವನ್ನು ..................... ಎಂದು ಆಚರಿಸಲಾಗುತ್ತದೆ.",
        "options": ["ಎಂಜಿನಿಯರುಗಳ ದಿನ", "ಶಿಕ್ಷಕರ ದಿನ", "ವಿದ್ಯಾರ್ಥಿಗಳ ದಿನ", "ವಿಜ್ಞಾನ ದಿನ"],
        "answer": "ಎಂಜಿನಿಯರುಗಳ ದಿನ"
    },
    {
        "question": "ಪುರಸ್ಕಾರ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ಪುರಃ + ಕಾರ", "ಪುರ + ಸ್ಕಾರ", "ಪುರಸ್ + ಕಾರ", "ಪುರಸ್ + ಆರ"],
        "answer": "ಪುರಃ + ಕಾರ"
    },
    {
        "question": "ಮನಸ್ಸು ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ಮನಃ + ಸು", "ಮನ +స్సు", "ಮನಸ್ + ಸು", "ಮನ + ಅಸ್ಸು"],
        "answer": "ಮನಃ + ಸು"
    },
    {
        "question": "ನಮಸ್ಕಾರ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ನಮಃ + ಕಾರ", "ನಮ + ಸ್ಕಾರ", "ನಮಸ್ + ಕಾರ", "ನಮಸ್ + ಆರ"],
        "answer": "ನಮಃ + ಕಾರ"
    },
    {
        "question": "ಚತುರ್ಮುಖ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ಚತುಃ + ಮುಖ", "ಚತುರ್ + ಮುಖ", "ಚತು + ರ್ಮುಖ", "ಚತು + ಮುಖ"],
        "answer": "ಚತುಃ + ಮುಖ"
    },
    {
        "question": "ನಿಶ್ಚಲ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ನಿಃ + ಚಲ", "ನಿಶ್ + ಚಲ", "ನಿ + ಶ್ಚಲ", "ನಿ + ಚಲ"],
        "answer": "ನಿಃ + ಚಲ"
    },
    {
        "question": "ದುಶ್ಚಟ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ದುಃ + ಚಟ", "ದುಶ್ + ಚಟ", "ದು + ಶ್ಚಟ", "ದು + ಚಟ"],
        "answer": "ದುಃ + ಚಟ"
    },
    {
        "question": "ವಯೋವೃದ್ಧ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ವಯಃ + ವೃದ್ಧ", "ವಯೋ + ವೃದ್ಧ", "ವಯ + ಓವೃದ್ಧ", "ವಯ + ವೃದ್ಧ"],
        "answer": "ವಯಃ + ವೃದ್ಧ"
    },
    {
        "question": "ಮನೋಹರ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ಮನಃ + ಹರ", "ಮನೋ + ಹರ", "ಮನ + ಓಹರ", "ಮನ + ಹರ"],
        "answer": "ಮನಃ + ಹರ"
    },
    {
        "question": "ಯಶಸ್ವಿ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ಯಶಃ + ಸ್ವಿ", "ಯಶಸ್ + ವಿ", "ಯಶ + ಸ್ವಿ", "ಯಶ + ಅಸ್ವಿ"],
        "answer": "ಯಶಃ + ಸ್ವಿ"
    },
    {
        "question": "ಪುನಸ್ಕಾರ ಪದವನ್ನು ಬಿಡಿಸಿ ಬರೆದಾಗ .....................",
        "options": ["ಪುನಃ + ಕಾರ", "ಪುನಸ್ + ಕಾರ", "ಪುನ + ಸ್ಕಾರ", "ಪುನ + ಆರ"],
        "answer": "ಪುನಃ + ಕಾರ"
    },
    {
        "question": "\"ಹೋಲಿಕೆ ಗಮನಿಸಿ, ಬಿಟ್ಟ ಸ್ಥಳ ತುಂಬಿರಿ.\",ಕರ: ಹಸ್ತ:: ಕರ : ....................... .",
        "options": ["ತೆರಿಗೆ", "ಕರು", "ಕರಣ", "ಕೈ"],
        "answer": "ತೆರಿಗೆ"
    },
    {
        "question": "\"\"\" ತಲ್ಲಣ \"\" ಪದದ ಅರ್ಥ ..........................",
        "options": ["ಕಳವಳ", "ಆಶ್ಚರ್ಯ", "ಸಂತೋಷ", "ದುಃಖ"],
        "answer": "ಕಳವಳ"
    },
    {
        "question": "ಕೆಳಗಿನ ಪದಗಳಲ್ಲಿ ಶುದ್ಧ ರೂಪವನ್ನು ಆರಿಸಿ .",
        "options": ["ಮಧ್ಯಾಹ್ನ", "ಮದ್ಯಾಹ್ನ", "ಮದ್ಯಾನ್ನ", "ಮದ್ಯಾಹ್ನ"],
        "answer": "ಮಧ್ಯಾಹ್ನ"
    }
];


// =============================================================================
// == Animated Background Component ==
// =============================================================================
const Particles = ({ currentTheme }) => {
  const themes = useMemo(() => ({
    cyberpunk: {
      name: 'Cyberpunk',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)',
      colors: ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff'],
      glowColors: ['#ff0080', '#00ff80', '#8000ff'],
      particles: ['square', 'line', 'dot']
    },
    neonSynthwave: {
      name: 'Neon Synthwave',
      background: 'linear-gradient(135deg, #0f0f23 0%, #2d1b69 50%, #11092a 100%)',
      colors: ['#ff0099', '#00ffff', '#ff6600', '#9900ff', '#ffff00'],
      glowColors: ['#ff0099', '#00ffff', '#ff6600'],
      particles: ['circle', 'triangle', 'diamond']
    },
     organic: {
      name: 'Organic Nature',
      background: 'linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 50%, #2a3f2a 100%)',
      colors: ['#4ade80', '#22c55e', '#16a34a', '#65a30d', '#84cc16'],
      glowColors: ['#4ade80', '#22c55e', '#84cc16'],
      particles: ['blob', 'leaf', 'circle']
    },
    minimalist: {
      name: 'Minimalist Geometric',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      colors: ['#334155', '#64748b', '#475569', '#1e293b', '#0f172a'],
      glowColors: ['#334155', '#64748b', '#475569'],
      particles: ['square', 'circle', 'line']
    },
    retroFuturistic: {
      name: 'Retro Futuristic',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#451a03'],
      glowColors: ['#fbbf24', '#f59e0b', '#d97706'],
      particles: ['hexagon', 'square', 'diamond']
    },
    darkAcademia: {
      name: 'Dark Academia',
      background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
      colors: ['#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c'],
      glowColors: ['#d6d3d1', '#a8a29e', '#78716c'],
      particles: ['book', 'quill', 'circle']
    },
    holographic: {
      name: 'Holographic Tech',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      colors: ['#00f5ff', '#ff00f5', '#f5ff00', '#00ff50', '#5000ff'],
      glowColors: ['#00f5ff', '#ff00f5', '#f5ff00'],
      particles: ['hologram', 'grid', 'dot']
    },
    cosmic: {
      name: 'Cosmic Space',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0033 50%, #000033 100%)',
      colors: ['#ffffff', '#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4'],
      glowColors: ['#ffffff', '#ff6b9d', '#4ecdc4'],
      particles: ['star', 'planet', 'comet']
    }
  }), []);

  const selectedTheme = currentTheme || themes.cyberpunk;

  const particleData = useMemo(() => {
    const particleCount = Math.floor(Math.random() * 8) + 8; // 8-15 particles
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      type: selectedTheme.particles[Math.floor(Math.random() * selectedTheme.particles.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // 10-30px
      color: selectedTheme.colors[Math.floor(Math.random() * selectedTheme.colors.length)],
      glowColor: selectedTheme.glowColors[Math.floor(Math.random() * selectedTheme.glowColors.length)],
      duration: Math.random() * 10 + 15, // 15-25s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
      direction: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5, // 0.5-1.0
      layer: Math.floor(Math.random() * 3) // 0, 1, or 2 for layering
    }));
  }, [selectedTheme]);

  const renderParticle = (particle) => {
    const baseStyle = {
      position: 'absolute',
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
      transform: `scale(${particle.scale})`,
      zIndex: particle.layer,
      willChange: 'transform, opacity'
    };

    const shapes = {
      circle: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      square: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            borderRadius: '2px',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      triangle: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: `${particle.size/2}px solid transparent`,
            borderRight: `${particle.size/2}px solid transparent`,
            borderBottom: `${particle.size}px solid ${particle.color}`,
            filter: `drop-shadow(0 0 ${particle.size/2}px ${particle.glowColor}33)`
          }}
        />
      ),
       diamond: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            transform: `scale(${particle.scale}) rotate(45deg)`,
            borderRadius: '2px',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      line: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            width: `${particle.size * 2}px`,
            height: '2px',
            backgroundColor: particle.color,
            borderRadius: '1px',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      star: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}66`
          }}
        />
      ),
      hexagon: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      blob: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            borderRadius: `${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}%`,
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      leaf: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: particle.color,
            borderRadius: '0 100% 0 100%',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      dot: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            width: `${particle.size/2}px`,
            height: `${particle.size/2}px`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}66`
          }}
        />
      ),
      hologram: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: 'transparent',
            border: `2px solid ${particle.color}`,
            borderRadius: '50%',
            boxShadow: `inset 0 0 ${particle.size/2}px ${particle.glowColor}33, 0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      grid: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            backgroundColor: 'transparent',
            border: `1px solid ${particle.color}`,
            borderRadius: '2px',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}33`
          }}
        />
      ),
      planet: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            background: `radial-gradient(circle at 30% 30%, ${particle.color}, ${particle.color}88)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}44`
          }}
        />
      ),
      comet: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            width: `${particle.size * 1.5}px`,
            height: `${particle.size/2}px`,
            background: `linear-gradient(90deg, ${particle.color}, transparent)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size}px ${particle.glowColor}44`
          }}
        />
      ),
      book: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            width: `${particle.size * 0.8}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '2px',
            boxShadow: `2px 0 0 ${particle.color}cc, 0 0 ${particle.size/2}px ${particle.glowColor}33`
          }}
        />
      ),
      quill: (
        <div
          key={particle.id}
          className={`particle-${particle.id}`}
          style={{
            ...baseStyle,
            width: '2px',
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: `0 0 ${particle.size/2}px ${particle.glowColor}33`
          }}
        />
      )
    };

    return shapes[particle.type] || shapes.circle;
  };

  return (
    <div className="particles-container">
      {particleData.map(renderParticle)}
      
      <style>{`
        .particles-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${selectedTheme.background};
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }

        ${particleData.map(particle => `
          .particle-${particle.id} {
            animation: 
              float-${particle.id} ${particle.duration}s ease-in-out infinite ${particle.delay}s,
              fade-${particle.id} ${particle.duration * 0.5}s ease-in-out infinite alternate ${particle.delay * 0.5}s,
              rotate-${particle.id} ${particle.duration * 1.5}s linear infinite ${particle.delay}s;
          }

          @keyframes float-${particle.id} {
            0%, 100% {
              transform: 
                scale(${particle.scale}) 
                rotate(${particle.direction}deg)
                translateX(0px) 
                translateY(0px);
            }
            25% {
              transform: 
                scale(${particle.scale * 1.1}) 
                rotate(${particle.direction + 90}deg)
                translateX(${Math.sin(particle.id) * 30}px) 
                translateY(${Math.cos(particle.id) * 20}px);
            }
            50% {
              transform: 
                scale(${particle.scale * 0.9}) 
                rotate(${particle.direction + 180}deg)
                translateX(${Math.cos(particle.id) * 40}px) 
                translateY(${Math.sin(particle.id) * 30}px);
            }
            75% {
              transform: 
                scale(${particle.scale * 1.05}) 
                rotate(${particle.direction + 270}deg)
                translateX(${Math.sin(particle.id + 1) * 25}px) 
                translateY(${Math.cos(particle.id + 1) * 35}px);
            }
          }

          @keyframes fade-${particle.id} {
            0% { opacity: ${particle.opacity * 0.3}; }
            100% { opacity: ${particle.opacity}; }
          }

          @keyframes rotate-${particle.id} {
            from { transform: rotate(0deg); }
            to { transform: rotate(${particle.direction > 180 ? 360 : -360}deg); }
          }
        `).join('')}

        .particles-container * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @media (prefers-reduced-motion: reduce) {
          .particles-container * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        @media (max-width: 768px) {
          .particles-container {
            transform: translateZ(0);
          }
        }
      `}</style>
    </div>
  );
};


// =============================================================================
// == Main App Component ==
// =============================================================================
export default function App() {
  // Theme management
  const themes = useMemo(() => ({
    cyberpunk: {
      name: 'Cyberpunk',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)',
      colors: ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff'],
      glowColors: ['#ff0080', '#00ff80', '#8000ff'],
      particles: ['square', 'line', 'dot']
    },
    neonSynthwave: {
      name: 'Neon Synthwave',
      background: 'linear-gradient(135deg, #0f0f23 0%, #2d1b69 50%, #11092a 100%)',
      colors: ['#ff0099', '#00ffff', '#ff6600', '#9900ff', '#ffff00'],
      glowColors: ['#ff0099', '#00ffff', '#ff6600'],
      particles: ['circle', 'triangle', 'diamond']
    },
     organic: {
      name: 'Organic Nature',
      background: 'linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 50%, #2a3f2a 100%)',
      colors: ['#4ade80', '#22c55e', '#16a34a', '#65a30d', '#84cc16'],
      glowColors: ['#4ade80', '#22c55e', '#84cc16'],
      particles: ['blob', 'leaf', 'circle']
    },
    minimalist: {
      name: 'Minimalist Geometric',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      colors: ['#334155', '#64748b', '#475569', '#1e293b', '#0f172a'],
      glowColors: ['#334155', '#64748b', '#475569'],
      particles: ['square', 'circle', 'line']
    },
    retroFuturistic: {
      name: 'Retro Futuristic',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#451a03'],
      glowColors: ['#fbbf24', '#f59e0b', '#d97706'],
      particles: ['hexagon', 'square', 'diamond']
    },
    darkAcademia: {
      name: 'Dark Academia',
      background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
      colors: ['#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c'],
      glowColors: ['#d6d3d1', '#a8a29e', '#78716c'],
      particles: ['book', 'quill', 'circle']
    },
    holographic: {
      name: 'Holographic Tech',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      colors: ['#00f5ff', '#ff00f5', '#f5ff00', '#00ff50', '#5000ff'],
      glowColors: ['#00f5ff', '#ff00f5', '#f5ff00'],
      particles: ['hologram', 'grid', 'dot']
    },
    cosmic: {
      name: 'Cosmic Space',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0033 50%, #000033 100%)',
      colors: ['#ffffff', '#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4'],
      glowColors: ['#ffffff', '#ff6b9d', '#4ecdc4'],
      particles: ['star', 'planet', 'comet']
    }
  }), []);

  const themeKeys = Object.keys(themes);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(() => Math.floor(Math.random() * themeKeys.length));
  const currentTheme = themes[themeKeys[currentThemeIndex]];

  // State management for the quiz
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'loser', 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Store user's answers
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle questions once on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Effect to handle dark mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Function to cycle through themes
  const toggleTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themeKeys.length);
  };

  // Function to start the quiz
  const startQuiz = (ready) => {
    if (ready) {
      setGameState('quiz');
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswers({});
    } else {
      setGameState('loser');
    }
  };
  
  // *** FIX: Function to go back to the start screen ***
  const goHome = () => {
      setGameState('start');
  }

  // Function to restart the quiz
  const restartQuiz = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    startQuiz(true);
  };

  // Function to handle user's answer selection
  const handleAnswer = (selectedOption) => {
    // Prevent answering if already answered
    if (userAnswers[currentQuestionIndex] !== undefined) return;

    const isCorrect = selectedOption === shuffledQuestions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: { selected: selectedOption, correct: isCorrect } }));

    // Automatically move to the next question or show results
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setGameState('result');
      }
    }, 1200);
  };

  // Function to jump to a specific question
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setIsNavOpen(false);
  };

  // Function to render the current screen based on gameState
  const renderScreen = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={startQuiz} />;
      case 'loser':
        return <LoserScreen onGoBack={goHome} />; // *** FIX: Pass goHome function ***
      case 'quiz':
        if (shuffledQuestions.length === 0) return <div>Loading...</div>;
        return (
          <QuizScreen
            question={shuffledQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={shuffledQuestions.length}
            userAnswer={userAnswers[currentQuestionIndex]}
          />
        );
      case 'result':
        return <ResultScreen score={score} total={shuffledQuestions.length} onRestart={restartQuiz} />;
      default:
        return <StartScreen onStart={startQuiz} />;
    }
  };

  return (
    <>
      <Particles currentTheme={currentTheme} />
      {/* *** FIX: Added dark mode background and proper centering classes *** */}
      <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col items-center justify-center p-4 ${isDarkMode ? 'dark bg-gray-900 bg-opacity-80' : 'bg-transparent'}`}>
        
        <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-4 text-white fixed top-0 left-1/2 -translate-x-1/2 z-20">
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-shadow">Samskruthika Kannada Quiz</h1>
          <div className="flex items-center space-x-4">
            {gameState === 'quiz' && (
              <div className="bg-black bg-opacity-30 backdrop-blur-sm text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-lg">
                Score: {score} / {shuffledQuestions.length}
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-black bg-opacity-30 backdrop-blur-sm text-xs font-semibold transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white min-w-[80px] text-center"
              title={`Current: ${currentTheme.name}`}
            >
              🎨 {currentTheme.name}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-black bg-opacity-30 backdrop-blur-sm text-2xl transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <main className="w-full flex-grow flex items-center justify-center pt-20 pb-20">
          {renderScreen()}
        </main>

        {/* Navigation Bar */}
        {gameState === 'quiz' && (
          <>
            <button 
              onClick={() => setIsNavOpen(true)}
              className="fixed bottom-5 left-5 z-30 bg-indigo-600 text-white p-3 rounded-full shadow-lg text-2xl hover:bg-indigo-700 transition-transform duration-300 hover:scale-110"
            >
              ☰
            </button>
            
            {/* *** FIX: Added overlay for closing nav *** */}
            {isNavOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setIsNavOpen(false)}
              ></div>
            )}

            <div 
              className={`fixed top-0 left-0 h-full bg-gray-900 bg-opacity-80 backdrop-blur-md p-5 z-40 transition-transform duration-500 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} w-64 md:w-80 overflow-y-auto`}
            >
              {/* *** FIX: Added close button to nav panel *** */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Questions</h3>
                <button onClick={() => setIsNavOpen(false)} className="text-white text-3xl hover:text-red-500 transition-colors">
                  &times;
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {shuffledQuestions.map((_, index) => {
                  const answerStatus = userAnswers[index];
                  let buttonClass = 'bg-gray-700 hover:bg-gray-600';
                  if (index === currentQuestionIndex) {
                    buttonClass = 'bg-indigo-500 ring-2 ring-white';
                  } else if (answerStatus) {
                     buttonClass = answerStatus.correct ? 'bg-green-600' : 'bg-red-600';
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`text-white font-bold py-2 px-2 rounded-lg transition-all duration-200 text-center ${buttonClass}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// =============================================================================
// == Screen Components ==
// =============================================================================

const StartScreen = ({ onStart }) => (
  <div className="text-center text-white p-8 bg-black bg-opacity-40 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-shadow-lg">Are you ready?</h1>
    <div className="flex justify-center gap-4">
      <button onClick={() => onStart(true)} className="btn-primary">Yes</button>
      <button onClick={() => onStart(false)} className="btn-secondary">No</button>
    </div>
  </div>
);

// *** FIX: Added onGoBack prop and a button ***
const LoserScreen = ({ onGoBack }) => (
  <div className="text-center text-white p-8 bg-black bg-opacity-40 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in">
    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-red-400 text-shadow-lg">
      CMONNN STUDYYYYY LOSERRRRRRRRRRRRRRRRRR 😭
    </h2>
    <button onClick={onGoBack} className="btn-secondary">Go Back</button>
  </div>
);

const QuizScreen = ({ question, onAnswer, questionNumber, totalQuestions, userAnswer }) => {
  const shuffledOptions = useMemo(() => {
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [question]);

  const getButtonClass = (option) => {
    if (!userAnswer) {
      return 'bg-opacity-50 hover:bg-opacity-70'; // Default state
    }
    const isSelected = userAnswer.selected === option;
    const isCorrect = question.answer === option;

    if (isCorrect) {
      return 'bg-green-500 bg-opacity-100 animate-pulse-correct'; // Correct answer is always green
    }
    if (isSelected && !userAnswer.correct) {
      return 'bg-red-500 bg-opacity-100 animate-shake'; // Selected wrong answer
    }
    return 'bg-opacity-30 cursor-not-allowed'; // Other options
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl text-white animate-slide-up">
      <div className="mb-6 text-center">
        <p className="text-lg md:text-xl font-semibold text-indigo-300">Question {questionNumber} / {totalQuestions}</p>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">{question.question}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={!!userAnswer}
            className={`p-4 rounded-lg text-lg font-medium text-left transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400
              bg-black ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const ResultScreen = ({ score, total, onRestart }) => (
  <div className="text-center text-white p-8 bg-black bg-opacity-40 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-shadow-lg">Quiz Complete!</h2>
    <p className="text-2xl md:text-3xl mb-8">Your Final Score: <span className="text-green-400 font-bold">{score}</span> / {total}</p>
    <button onClick={onRestart} className="btn-primary">Try Again</button>
  </div>
);

// Inject Tailwind CSS and Global Styles
const root = document.getElementById('root');
if (root) {
  const tailwindScript = document.createElement('script');
  tailwindScript.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(tailwindScript);
  
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    html.dark {
        color-scheme: dark;
    }
    .text-shadow {
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    .text-shadow-lg {
      text-shadow: 3px 3px 6px rgba(0,0,0,0.7);
    }
    .btn-primary {
      background-color: #4f46e5; color: white; font-weight: bold; padding: 0.75rem 2rem; border-radius: 9999px; font-size: 1.125rem; transition: all 0.3s; transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .btn-primary:hover {
      transform: scale(1.05); background-color: #6366f1;
    }
    .btn-secondary {
      background-color: #4b5563; color: white; font-weight: bold; padding: 0.75rem 2rem; border-radius: 9999px; font-size: 1.125rem; transition: all 0.3s; transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .btn-secondary:hover {
      transform: scale(1.05); background-color: #6b7280;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slide-up 0.5s ease-out forwards;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }
    @keyframes pulse-correct {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
      50% { transform: scale(1.02); box-shadow: 0 0 10px 5px rgba(74, 222, 128, 0); }
    }
    .animate-pulse-correct {
      animation: pulse-correct 1s ease-in-out;
    }
  `;
  document.head.appendChild(styleSheet);
}
