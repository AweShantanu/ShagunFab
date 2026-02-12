@echo off
echo Starting MongoDB...
md data 2>nul
mongod --dbpath "./data" --port 27017
pause
