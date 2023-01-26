
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
.connect("mongodb://mongo:a7CzVFcCXodqm9SYemjo@containers-us-west-122.railway.app:7625")
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