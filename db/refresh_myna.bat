@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
chcp 65001 >NUL

:: ================= CONFIG =================
SET "LOCAL_DB=ebd"
SET "LOCAL_USER=postgres"
SET "LOCAL_HOST=localhost"
SET "DUMP_PATH=E:\Abhinandan\myna\dumps"
SET "TABLES=OBSERVATION soib TAXA LIST LOCATION"

SET "PGHOST_REMOTE=mynardsnew.cv87ng3h6kdc.us-east-1.rds.amazonaws.com"
SET "PGPORT_REMOTE=5432"
SET "PGUSER_REMOTE=Akshit"
SET "PGDATABASE_REMOTE=ebd"

SET "LOGFILE=E:\Abhinandan\myna\refresh_log.txt"
:: Env variables (optional):
::   MYNA_LOCAL_PGPASSWORD
::   MYNA_REMOTE_PGPASSWORD
:: ==========================================

echo =========================================================== >> "%LOGFILE%"
echo [%date% %time%]  MYNA DATABASE REFRESH STARTED >> "%LOGFILE%"
echo =========================================================== >> "%LOGFILE%"

REM ================================================================
REM 1️ LOCAL DB PASSWORD
REM ================================================================
if defined MYNA_LOCAL_PGPASSWORD (
  set "PGPASSWORD_LOCAL=%MYNA_LOCAL_PGPASSWORD%"
  echo [%date% %time%] Local password loaded from environment variable. >> "%LOGFILE%"
) else (
  echo Local DB password not set in environment. Prompting user...
  for /f "usebackq delims=" %%P in (`
    powershell -Command "Write-Output ( [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR( (Read-Host -AsSecureString 'Enter Local DB password') ) ) )"
  `) do set "PGPASSWORD_LOCAL=%%P"
)

REM Test local DB connection
echo Testing local DB connection...
set "PGPASSWORD=%PGPASSWORD_LOCAL%"
psql -h %LOCAL_HOST% -p 5432 -U %LOCAL_USER% -d %LOCAL_DB% -c "SELECT 1;" >NUL 2>&1
if ERRORLEVEL 1 (
  echo [%date% %time%] Local DB connection failed. Asking again. >> "%LOGFILE%"
  echo Incorrect local DB password. Please try again:
  for /f "usebackq delims=" %%P in (`
    powershell -Command "Write-Output ( [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR( (Read-Host -AsSecureString 'Re-enter Local DB password') ) ) )"
  `) do set "PGPASSWORD_LOCAL=%%P"
  set "PGPASSWORD=%PGPASSWORD_LOCAL%"
  psql -h %LOCAL_HOST% -p 5432 -U %LOCAL_USER% -d %LOCAL_DB% -c "SELECT 1;" >NUL 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] ERROR: Local DB connection failed twice. Aborting. >> "%LOGFILE%"
    echo ERROR: Could not authenticate to local DB. Aborting.
    goto :cleanup_and_exit
  )
)
echo [%date% %time%] Local DB connection successful. >> "%LOGFILE%"
set "PGPASSWORD="

REM ================================================================
REM 2️ CHECK IF DUMPS ALREADY EXIST
REM ================================================================
set "ALL_EXIST=1"
for %%T in (%TABLES%) do (
  if not exist "%DUMP_PATH%\%%T.sql" (
    echo [%date% %time%] Dump file missing for %%T. >> "%LOGFILE%"
    set "ALL_EXIST=0"
  )
)

if "%ALL_EXIST%"=="1" (
  echo [%date% %time%] All dump files already exist. Skipping local dump. >> "%LOGFILE%"
  goto :skip_dump
)

REM ================================================================
REM 2️ DUMP LOCAL TABLES (only if needed)
REM ================================================================
echo Dumping local tables to "%DUMP_PATH%". >> "%LOGFILE%"
set "DUMP_FAILED=0"

for %%T in (%TABLES%) do (
  echo Dumping %%T ...
  set "PGPASSWORD=%PGPASSWORD_LOCAL%"
  pg_dump.exe -h %LOCAL_HOST% -p 5432 -U %LOCAL_USER% -d %LOCAL_DB% -t "\"%%T\"" --data-only --inserts -F p --encoding=UTF8 -f "%DUMP_PATH%\%%T.sql" >NUL 2>> "%LOGFILE%"
  if ERRORLEVEL 1 (
    echo [%date% %time%] ERROR: pg_dump failed for %%T. >> "%LOGFILE%"
    set "DUMP_FAILED=1"
  ) else (
    echo [%date% %time%] Dump completed: %%T -> %DUMP_PATH%\%%T.sql >> "%LOGFILE%"
  )
  set "PGPASSWORD="
)

if "%DUMP_FAILED%"=="1" (
  echo One or more dumps failed. Aborting.
  goto :cleanup_and_exit
)

echo [%date% %time%] All dumps completed and verified. >> "%LOGFILE%"

:skip_dump

REM ================================================================
REM 3️ REMOTE (RDS) PASSWORD
REM ================================================================
if defined MYNA_REMOTE_PGPASSWORD (
  set "PGPASSWORD_REMOTE=%MYNA_REMOTE_PGPASSWORD%"
  echo [%date% %time%] Remote password loaded from environment variable. >> "%LOGFILE%"
) else (
  echo Remote RDS password not set in environment. Prompting user...
  for /f "usebackq delims=" %%R in (`
    powershell -Command "Write-Output ( [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR( (Read-Host -AsSecureString 'Enter RDS password') ) ) )"
  `) do set "PGPASSWORD_REMOTE=%%R"
)

REM Test remote connection
set "PGPASSWORD=%PGPASSWORD_REMOTE%"
psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "SELECT 1;" >NUL 2>&1
if ERRORLEVEL 1 (
  echo [%date% %time%] Remote DB connection failed. Asking again. >> "%LOGFILE%"
  echo Incorrect remote RDS password. Please try again:
  for /f "usebackq delims=" %%R in (`
    powershell -Command "Write-Output ( [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR( (Read-Host -AsSecureString 'Re-enter RDS password') ) ) )"
  `) do set "PGPASSWORD_REMOTE=%%R"
  set "PGPASSWORD=%PGPASSWORD_REMOTE%"
  psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "SELECT 1;" >NUL 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] ERROR: Remote RDS connection failed twice. Aborting. >> "%LOGFILE%"
    echo ERROR: Could not authenticate to RDS. Aborting.
    goto :cleanup_and_exit
  )
)
echo [%date% %time%] Remote RDS connection successful. >> "%LOGFILE%"
set "PGPASSWORD="

REM ================================================================
REM 4️ PROCEED WITH TRUNCATE + REFRESH LOGIC
REM ================================================================
echo.
echo ******************************************************
echo WARNING: This will TRUNCATE tables on REMOTE DB %PGDATABASE_REMOTE%
echo Tables: %TABLES%
echo Type YES (all caps) to proceed:
set /p CONFIRM=
if NOT "%CONFIRM%"=="YES" (
  echo Aborted by user. >> "%LOGFILE%"
  goto :cleanup_and_exit
)

REM Continue with truncate, import, refresh ping–pong
set "PGPASSWORD=%PGPASSWORD_REMOTE%"
echo [%date% %time%] Starting remote data load and MV refresh. >> "%LOGFILE%"


psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "TRUNCATE TABLE \"soib\", \"TAXA\", \"LIST\", \"LOCATION\", \"OBSERVATION\" RESTART IDENTITY;" >> "%LOGFILE%" 2>&1
if ERRORLEVEL 1 (
  echo [%date% %time%] ERROR: Truncate failed. >> "%LOGFILE%"
  goto :cleanup_and_exit
)

for %%T in (%TABLES%) do (
  echo Importing %%T on remote...
  psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -f "%DUMP_PATH%\%%T.sql" >> "%LOGFILE%" 2>&1
  if ERRORLEVEL 1 (
    echo [%date% %time%] ERROR: Remote import failed for %%T >> "%LOGFILE%"
    goto :cleanup_and_exit
  )
)

echo Running VACUUM ANALYZE...
for %%T in (%TABLES%) do (
  psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "VACUUM ANALYZE \"%%T\";" >> "%LOGFILE%" 2>&1
)

REM Detect active/inactive MV
for /f "usebackq tokens=* delims=" %%D in (`
  psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -t -A -c "SELECT definition FROM pg_views WHERE viewname='merges';"
`) do set "DEF=%%D"

if "%DEF%"=="" (
  echo [%date% %time%] ERROR: Could not read definition of merges. >> "%LOGFILE%"
  goto :cleanup_and_exit
)

echo %DEF% | find /I "merge_ping" >nul
if %ERRORLEVEL%==0 (
  set "CURRENT=ping"
  set "NEXT=pong"
) else (
  set "CURRENT=pong"
  set "NEXT=ping"
)

set "REFRESH_CMD=REFRESH MATERIALIZED VIEW merge_%NEXT%;"
psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "%REFRESH_CMD%" >> "%LOGFILE%" 2>&1

psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "DROP VIEW IF EXISTS merges;" >> "%LOGFILE%" 2>&1
psql -h %PGHOST_REMOTE% -p %PGPORT_REMOTE% -U %PGUSER_REMOTE% -d %PGDATABASE_REMOTE% -c "CREATE OR REPLACE VIEW merges AS SELECT * FROM merge_%NEXT%;" >> "%LOGFILE%" 2>&1

echo [%date% %time%] SUCCESS: Refresh complete. Active view now merge_%NEXT% >> "%LOGFILE%"
echo SUCCESS: Active view now merge_%NEXT%

:cleanup_and_exit
set "PGPASSWORD="
set "PGPASSWORD_LOCAL="
set "PGPASSWORD_REMOTE="
echo [%date% %time%] Script finished. >> "%LOGFILE%"
ENDLOCAL
exit /b
