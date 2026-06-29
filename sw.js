// --- Font Size Control Logic ---
        const fontSizeLabel = document.getElementById('fontSizeLabel');
        let currentFontSize = 15;

        function updateFontSize(delta) {
            currentFontSize = Math.max(10, Math.min(30, currentFontSize + delta));
            fontSizeLabel.textContent = currentFontSize + 'px';
            htmlDoc.style.setProperty('--editor-font-size', currentFontSize + 'px');
            editor.refresh();
            saveSettings();
        }

        document.getElementById('fontDec').addEventListener('click', () => updateFontSize(-1));
        document.getElementById('fontInc').addEventListener('click', () => updateFontSize(1));

        // Updated Load Settings
        function loadSettings() {
            const stored = localStorage.getItem('codeEditorSettings');
            const settings = stored ? JSON.parse(stored) : { theme: 'dark', wrap: true, invisibles: false, fontSize: 15 };

            htmlDoc.setAttribute('data-theme', settings.theme);
            editor.setOption('theme', settings.theme === 'dark' ? 'material-darker' : 'eclipse');
            
            // ... (keep existing theme and wrap logic)

            // Apply font size
            currentFontSize = settings.fontSize || 15;
            fontSizeLabel.textContent = currentFontSize + 'px';
            htmlDoc.style.setProperty('--editor-font-size', currentFontSize + 'px');
            editor.refresh();
        }
