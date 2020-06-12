const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const modelName = require('./core/models-names');

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const activityRouter = require('./routes/activity');
const photosRouter = require('./routes/photos');
const filesRouter = require('./routes/files');
const aboutRouter = require('./routes/about');
const districtCulture = require('./routes/districtCulture');
const departmentRouter = require('./routes/department');
const excursionRouter = require('./routes/excursion');
const contactRouter = require('./routes/contacts');
const searchRouter = require('./routes/search');
const serviceRouter = require('./routes/service');
const culturalInstitutionRouter = require('./routes/culturalInstitution');


const app = express();

app.locals.title = "Кольтурно-методический центр";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    includePaths: [path.join(__dirname), 'node_modules'],
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


//routing
app.use('/', indexRouter);

//files
app.use('/photos', photosRouter);
app.use('/files', filesRouter);

//pages
app.use(`/${modelName.news}`, newsRouter);
app.use(`/${modelName.activity}`, activityRouter);
app.use(`/${modelName.department}`, departmentRouter);
app.use(`/${modelName.excursion}`, excursionRouter);
app.use(`/${modelName.service}`, serviceRouter);
app.use(`/${modelName.culturalInstitution}`, culturalInstitutionRouter);
app.use(`/about`, aboutRouter);
app.use(`/districtCulture`, districtCulture);
app.use(`/contacts`, contactRouter);
app.use(`/search`, searchRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
