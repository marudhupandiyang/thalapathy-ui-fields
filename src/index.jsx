const StringView = require('./String');
const DateTimeView = require('./DateTime');
const IntegerView = require('./Integer');
const BooleanView = require('./Boolean');
const JSONBView = require('./JSONB');
const AutoIncrementView = require('./AutoIncrement');
const PasswordView = require('./Password');
const FileView = require('./File');

module.exports = {
  String: StringView,
  DateTime: DateTimeView,
  Integer: IntegerView,
  Boolean: BooleanView,
  JSONB: JSONBView,
  AutoIncrement: AutoIncrementView,
  Password: PasswordView,
  File: FileView,
};
