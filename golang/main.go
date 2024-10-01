package main

import (
	"fmt"
	postgres "go_docker_example/sql"
)

func main() {
	fmt.Println("Iniciando validação com banco de dados:")

	db := postgres.Postgres{}

	db.Connect()

	err := postgres.Client.Ping()

	postgres.Client.Close()

	if err != nil {
		fmt.Println("FALHA\n", err)
	} else {
		fmt.Println("SUCESSO")
	}
}
