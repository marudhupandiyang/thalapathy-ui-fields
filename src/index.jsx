const StringView = require('./String');
const TextView = require('./Text');
const DateTimeView = require('./DateTime');
const IntegerView = require('./Integer');
const DecimalView = require('./Decimal');
const BooleanView = require('./Boolean');
const JSONBView = require('./JSONB');
const AutoIncrementView = require('./AutoIncrement');
const PasswordView = require('./Password');
const FileView = require('./File');

module.exports = {
  String: StringView,
  Text: TextView,
  DateTime: DateTimeView,
  Integer: IntegerView,
  Decimal: DecimalView,
  Boolean: BooleanView,
  JSONB: JSONBView,
  AutoIncrement: AutoIncrementView,
  Password: PasswordView,
  File: FileView,
};
