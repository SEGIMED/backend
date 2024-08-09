# SEGIMED-server
This repository contains the backend of Segimed project

## Git flow
Remember to work on your own root and ask for aproval of at least one person, before merge to development root

#### To do a push on my branch

git checkout development
git pull origin development                        It brings all changes from development branch 
git checkout -b feature/nueva-funcionalidad        I creates a new branch from development
git add .                                                                 
git commit -m “message here”
git push                                           It creates this new branch in the remote repo at github

## Git branch naming conventions
**bugfix**: used when the commit fixes a bug in the application code.

**feature**: used when a commit adds a new feature to the application.

**hotfix**: used when a commit adds a quick fix to the application.

**refactor**: used when the code does not fix a bug, nor add a feature.

**style**: used when changes do not affect the meaning of the code (whitespace, semicolons, formatting... etc).

**test**: used to add additional unit tests, or correct existing tests.

## Good practices

 * The comments, documentation and code must be in ENGLISH
 * Use the relevant validations in the models, in order to detect errors early and avoid failed queries to the database, and relevant validations in handlers.
 * Create unit tests for the routes to be created, because of the asociations between the models 
 * If a task is left incomplete then leave a TODO comment to specify what is missing and also leave a record in the trello.
 
   
   Happy codding :)
