git remote -v

data=""
if [ "$1" != "" ];
  then
  echo Haciendo pull desde $1 y rama master ...
  git pull $1 master -f > txt.txt
  data=`cat txt.txt`
  echo 'prueba ' $data
else
  read -p "Ingrese el alias de tu repositorio remoto: " remote

  echo Haciendo pull desde $remote y rama master ...
  git pull $remote master -f
  
fi

if [ "$data" = "Already up to date." ];then
  echo "App actualizado."
else
  echo Compilando ...
    npm run build
  echo Reiniando proceso api_care con PM2
    pm2 reload api_care
fi