package postgres

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"

	_ "github.com/lib/pq"
)

type Postgres struct {
	host     string
	port     int
	user     string
	password string
	database string
}

var Client *sql.DB

func (p *Postgres) Connect() {

	port, _ := strconv.Atoi(os.Getenv("DB_PORT"))
	credentials := Postgres{
		host:     os.Getenv("DB_HOST"),
		port:     port,
		user:     os.Getenv("DB_USER"),
		password: os.Getenv("DB_PASSWORD"),
		database: os.Getenv("DB_NAME"),
	}

	connStr := fmt.Sprintf("host=%s port=%v user=%s password=%s dbname=%s sslmode=disable", credentials.host, credentials.port, credentials.user, credentials.password, credentials.database)

	db, err := sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
	}

	err = db.Ping()

	if err != nil {
		panic(err)
	}

	fmt.Println("POSTGRES CONNECTION SUCCESS!")

	Client = db
}
