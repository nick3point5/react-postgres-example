const Pool = require('pg').Pool

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'my_database',
	password: 'postgres',
	port: 5432,
})

const getMerchants = () => {
	return new Promise(function (resolve, reject) {
		pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
			if (error) {
				reject(error)
			}

			resolve(results.rows)
		})
	})
}

const createMerchant = (body) => {
	return new Promise(function (resolve, reject) {
		const { name, email } = body
		pool.query(
			'INSERT INTO merchants (name, email) VALUES ($1,$2) RETURNING *',
			[name, email],
			(error, results) => {
				if (error) {
					reject(error)
				}

				resolve(`A new merchant has been added added:\n  name: ${results.rows[0].name}\n  email: ${results.rows[0].email}`)
			}
		)
	})
}

const deleteMerchant = (id) => {
	return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
	})
}

module.exports = {
	getMerchants,
	createMerchant,
	deleteMerchant,
}