1. Crée un dépôt GitHub et envoie-y tous ces fichiers (dossier .github compris).
2. (Recommandé) Dépôt > Settings > Secrets and variables > Actions > Variables > New : nom CFDICT_URL, valeur = lien de téléchargement direct du fichier CFDICT (cfdict.u8 ou .zip) trouvé sur chine.in. Sans lui, le dictionnaire sera en anglais.
3. Onglet Actions > Build APK > Run workflow. Télécharge l'artefact dictionnaire-chinois-apk.
4. Installe app-debug.apk. Tout fonctionne hors-ligne. Le champ clé API est optionnel (traduction de phrases en ligne).
