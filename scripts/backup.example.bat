@echo off
set "BACKUP_DIR=your_backup_destination"
set "CONTAINER_NAME=postgres_container"
set "DB_USER=your_db_user"
set "DB_NAME=your_db_name"

for /f %%I in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd_HH-mm'"') do set DATETIME=%%I
set "FILE_NAME=backup_%DATETIME%.sql"

docker exec -t %CONTAINER_NAME% pg_dump -U %DB_USER% %DB_NAME% > "%BACKUP_DIR%\%FILE_NAME%"

echo.
echo  Backup completed
echo  File: %FILE_NAME%
pause