"use strict";

const mssql = require('mssql');

module.exports = class Sql {
    constructor(stringConnection) {
        this.stringConnection = stringConnection;
    }

    connect() {
        mssql.on('error', err => {
            console.log(err);
            mssql.close();
        });

        return mssql.connect(this.stringConnection);
    }

    close() {
        return mssql.close();
    }


    async getArticle() {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`
                SELECT idArticulo,
                arNombre,
                arDescripcion
                FROM [Articulos]
                order by arNombre asc
                `);
            }).then(r => {
                mssql.close()
                resolve(r);
            }).catch(e => {
                reject(e);
            })

        })
    }

    async zetas(since, until) {
        let untilDate;
        const sinceDate = since;
        if (!until) {
            untilDate = sinceDate;
        } else {
            untilDate = until;
        }
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`
                    SELECT [zeSucursal],
                    *
                FROM [Zetas]
                where zeFecha between '${sinceDate}' and '${untilDate}' and zeTotal != 0
                `);

            }).then(r => {
                mssql.close()
                resolve(r);
            }).catch(e => {
                reject(e);
            })

        })
    }
    async bsalud(since, until) {
        let untilDate;
        console.log(since)
        const sinceDate = since;
        if (!until) {
            untilDate = sinceDate;
        } else {
            untilDate = until;
        }
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`
                SELECT  [Documentos_CAE].[idDocumento] as 'idDocumentosCae',
                        [Documentos_CAE].[idSucursal] as 'idSurcusalCae',
                        [Documentos_CAE].[idEmpresa],
                        [Documentos_CAE].[fecha],
                        [Documentos_CAE].[FechaEmision],
                        [Documentos_CAE].[FechaVencimiento],
						[Empleados].[emNombre],
                        [Documentos].[dcEmpleado],
                        [Documentos].[idSucursal],
						[Documentos].[idDocumento],
                        [Documentos].[dcDocumento],
                        [Documentos].[dcLetra],
                        [Documentos].[dcPuesto],
                        [Documentos].[dcBruto],
                        [Documentos].[dcDescuento],
                        [Documentos].[dcNeto],
						[Documentos].[dcFecha],
                        [Documentos].[dcHora],
                        [Documentos].[dcFechaAlta],
                        [Documentos].[dcExento],
                        [Documentos].[dcGravado],
                        [Documentos].[dcIva],
                        [Documentos].[dcNumero],
                        [Documentos].[dcDato3],
                        [Documentos].[dcDato0],
						[Documentos].[dcCuenta],
						[Documentos].[dcOSocial],
						[Documentos].[dcTarjeta],
                        [Documentos].[dcITarjeta],
                        [Documentos].[dcIOsocial],
                        [Documentos].[dcCliente],
                        [Clientes].[clTDocumento],
						[Clientes].[clIva],
						[Tarjetas].[tcTipo],
                        [Tarjetas].[tcNombre],
                        [PlanesOso].[plIdOSocial],
						[OSociales].[idOSocial],
						[OSociales].[osNombre]
                  FROM [Documentos_CAE] 
                  right join [Documentos] 
                  on [Documentos_CAE].[idDocumento] = [Documentos] .[dcNumero]
				  left join [Clientes]
				  on [Documentos].[dcCliente] = [Clientes].[idCliente]
				  left join [Tarjetas]
				  on [Documentos].[dcTarjeta] = [Tarjetas].[idTarjeta]
                  left join [PlanesOso]
				  on [Documentos].[dcOSocial] = [PlanesOso].[idPlan]
				  left join [OSociales]
				  on [PlanesOso].[plIdOSocial] = [OSociales].[idOSocial]
                  left join [Empleados]
				  on [Documentos].[dcEmpleado] = [Empleados].[idEmpleado]
                  where Documentos.dcFecha between '${sinceDate}' and '${untilDate}' and Documentos.dcDocumento != 'RC' 
                  order by Documentos.dcFecha asc 
				  `);

            }).then(r => {
                mssql.close()
                resolve(r);
            }).catch(e => {
                reject(e);
            })
        })
    }

    async oSocial() {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`        
                SELECT [idOSocial]
                ,[osNombre]
                FROM [wfarma].[dbo].[OSociales]
                `);
            }).then(r => {
                mssql.close()
                resolve(r);
            }).catch(e => {
                reject(e);
            })
        })
    }

    async select(table) {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().query(`select top(1) * from ${table}`);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    async selectById(table, id) {
        if (id == undefined || id === 0) {
            return await this.select(table);
        } else {
            return new Promise((resolve, reject) => {
                this.connect().then(pool => {
                    return pool.request().query(`select * from ${table} where id=${id}`);
                }).then(result => {
                    mssql.close();
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }

    async execStoreProcedure(storeProcedure) {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request().execute(storeProcedure);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    async execStoreProcedureById(storeProcedure, parameter) {
        return new Promise((resolve, reject) => {
            this.connect().then(pool => {
                return pool.request()
                    .input("id", mssql.Int, parameter)
                    .execute(storeProcedure);
            }).then(result => {
                mssql.close();
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

}
