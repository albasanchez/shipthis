<h1>Intrucciones para SET-UP inicial de la DB</h1>

<p>Para el presente proyecto hemos decidido utilizar <a href="https://www.postgresql.org/" target="blank"><strong>PostgreSQL</strong></a> como manejador de base de datos. A continuación se resumen una serie de instrucciones que se deben seguir para el <strong>SET-UP</strong> de la base de datos</p>

# Instalación de POSTGRESQL

Para realizar la instalación desde la linea de comandos:

```bash
#instalacion
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib

#verificacion
$ sudo -u postgres psql -c "SELECT version();"
```

Para mayor información, les extendemos una invitación formal al portal oficial de <a href="https://www.postgresql.org/" target="blank"><strong>PostgreSQL</strong></a>. Alli encontrarán instrucciones de instalación para diferentes SO, además de la <strong>Documentación Oficial</strong>.

# Creacion de USUARIO y BASE DE DATOS

Pasos a seguir:

1. Acceder a linea de comando y obtener permiso de super usuario en psql.

```bash
$ sudo su - postgres
postgres@$ psql
```

2. Crear el usuario.

```bash
> CREATE USER shipthis_client WITH SUPERUSER CREATEDB INHERIT LOGIN NOREPLICATION CONNECTION LIMIT -1 PASSWORD 'shipthis123456';
```

3. Crear la base de datos.

```bash
> CREATE DATABASE shipthisdb;
```

4. Asignar privilegios al usuario.

```bash
> GRANT ALL PRIVILEGES ON DATABASE shipthisdb TO shipthis_client;
```

LLegados a este punto la BD <strong>shipthisdb</strong> ha sido creada y el usuario <strong>shipthis_client</strong> tiene acceso a ella.

# Manejo de la BASE DE DATOS: Forma recomendada

## Inicializar tablas

Tras haber instalado el servidor y agregado el archivo .env de configuración, dirijare a la carpera del servidor y ejecutar los siguientes comandosÑ

Linux

```
$ npm run migration:generate fist-migration
$ npm run migration:migration:run
```

macOS y Windows:

```
$ npm run migrationwindows:generate firstmigration
$ npm run migrationwindows:run
```

## Llenado con datos iniciales

Para <strong>LLENAR</strong> las entidades con data de prueba ejecutar en el archivo de <a href="./inserts.sql" target=""><strong>INSERTS</strong></a>.

## Reinicialización de tablas

Dirijase a la carpeta del servidor y ejecutar los siguiente comandos

Linux

```
$ npm run migration:migration:revert
```

macOS y Windows:

```
$ npm run migrationwindows:reverse
```

# Manejo de la BASE DE DATOS: Forma alternativa

Para este paso se recomienda el uso de una interfaz gráfica para el manejador de base de dato como <a href="https://www.pgadmin.org/" target="blank"><strong>PGAdmin</strong></a>. En la página oficial entraran la documentación necesaria para descargarla y utilizarla.

Para los pasos siguiente se debera establecer un conector para poder interactuar con la base de datos.
Para la creacion del conector en <a href="https://www.pgadmin.org/" target="blank"><strong>PGAdmin</strong></a> se deben especificar los siguentes datos:

```bash
Name = "nombreDeLaConexion"
Host = "localhost"
Username = "shipthis_client"
Password = "shipthis123456"
```

## Creación y manejo de ENTIDADES

Establecida se procede a ejecutar los siguientes <strong>scripts</strong> segun sea el caso de uso deseado:

1. Para la <strong>CREACIÓN</strong> de entidades ejecutar en el archivo de <a href="./create.sql" target=""><strong>CREACIÓN</strong></a>.

2. Para <strong>LLENAR</strong> las entidades con data de prueba ejecutar en el archivo de <a href="./inserts.sql" target=""><strong>INSERTS</strong></a>.

3. Para <strong>REINICIAR</strong> la BD ejecutar los archivos de <a href="./drop.sql" target=""><strong>BORRADO</strong></a> y <a href="./create.sql" target=""><strong>CREACIÓN</strong></a> e <a href="./inserts.sql" target=""><strong>INSERTS</strong></a> secuencialmente.
