# Stocker Backend con NodeJS

_Api-rest generada como backend para la aplicacion StockerAPP. Integramente construida en NodeJS que integra con una BD no relacional orquestada en MongoDB._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Para levantar la aplicacion localmente es necesario contar con npm y mongodb , para  comprobar que lo tengas instalado_

```
npm -v
mongod --version
```
**En caso de no tener instalado alguno de los pre-requisitos, links a la documentacion oficial**

https://nodejs.org/es/download/

https://docs.mongodb.com/manual/installation/

### Instalación 🔧

_Una vez descargado el proyecto se procede a la instalacion de las librerias necesarias de la siguiente manera._

_En primer lugar la instalacion_

```
npm install
```

_luego levantar el proyecto_

```
npm start
```

```
[nodemon] 2.0.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Express server corriendo en el puerto 3000: Stocker online 
Base de datos Stocker online 

```

_Finalmente el servicio quedara levantado y expuesto en el puerto 3000._

_En caso de tener el puerto 3000 ocupado o simplemente querer cambiar el puerto donde se expone el servicio, simplemente modificar lo siguiente en app.js._

```
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000:\x1b[32m%s\x1b[0m ', ' Stocker online');
})

```



## Despliegue 📦

_Todos los cambios locales son refrescados al guardar el proyecto ya que esta integrado con **nodemon** y **express**_
_**nodemon** mantiene se mantiene a la escucha de cambios que se vayan generando_

## Construido con 🛠️

* [npm](https://docs.npmjs.com/) - 
* [express](https://expressjs.com/es/api.html) - 

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/equipostocker2020/GR07-EquipoStocker-BackEnd/wiki)

## Versionado 📌

Usamos [Github](http://github.com) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/equipostocker2020/GR07-EquipoStocker-BackEnd/tags).

## Autores ✒️

* **Gonzalo Figueras** - *Documentacion - Desarrollo* - [gonzaloFigueras](https://github.com/gonzaloFigueras)
* **Marcelo Gutierrez** - *Documentacion - Desarrollo* - [marcelofabiangutierrez88](https://github.com/marcelofabiangutierrez88)
* **Agustin Galarza** - *Documentacion - Desarrollo* - [AgustinArielGalarza](https://github.com/AgustinArielGalarza)



## Expresiones de Gratitud 🎁

* Este proyecto es la propuesta anual del taller de implementacion de la carrera Tecnico Superior en Analisis de Sistemas 📢
* Agradecemos al docente Mariano Trigila por la exigencia, el compromiso y siempre exigirnos mas 🤓.
