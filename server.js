
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/use.js';
import matcheSchema from './routes/matche.js';
const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'matchiniRahmaKhitem';
const hostname = '192.168.1.12';
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
.connect("mongodb://mongo:d5d0uuYHQqYyo6naHe0I@containers-us-west-97.railway.app:6924")
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));
app.use('/user', userRoutes);
app.use('/matche', matcheSchema);
app.listen(port, () => {
  console.log(`Server running at http:${port}/`);                                                       
});