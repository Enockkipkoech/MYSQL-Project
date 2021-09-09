import {NextFunction, Request, Response } from 'express';
import { Connect,Query } from '../config/mysql';

const NAMESPACE = 'Books';

const createBook = async (req:Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE,'Inserting Books to DB');

    let {author, title} = req.body;

    let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

    Connect()
    .then((connection) => {
        Query(connection, query)
        .then((result) => {
            console.log(NAMESPACE, 'Book created:', result);

            return res.status(200).json({
                status: "Success",
                result
            });
        })
        .catch((error) => {
            console.log(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        })
        .finally(() => {
            console.log(NAMESPACE, 'Clossing connection...');
            connection.end();
        });
    })
    .catch((error) => {
        console.log(NAMESPACE, error.message, error);

        return res.status(200).json({
            message: error.message,
            error
        }); 
    });
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    console.log(NAMESPACE, 'Getting all books.');

    let query = 'SELECT * FROM books';

    Connect()
    .then((connection) => {
        Query(connection, query)
        .then((results) => {
            console.log(NAMESPACE, 'Retrieved All Books: ', results);
            
            return res.status(200).json({
                results                
            });
        })
        .catch((error) => {
            console.log(NAMESPACE, error.message, error);
            
            return res.status(200).json({
                message: error.message,
                RangeError
            });
        }).finally(() => {
            console.log(NAMESPACE, 'Clossing connection ...');
            connection.end();
        });
    })
    .catch((error) => {
    console.log(NAMESPACE, error.message, error);

    return res.status(200).json({
        message: error.message,
        error
    });
    
    });
};

export default {createBook, getAllBooks };