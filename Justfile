build:
  npx tailwindcss build __dev/styles.css -o __dev/output.css -c __dev/tailwind.config.js
  cleancss -o static/styles.min.css __dev/output.css