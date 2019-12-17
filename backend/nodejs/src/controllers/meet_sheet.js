"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}
//import uuidv4 from 'uuid/v4';

var Meet_sheet = {
  /**
   * Create A meet_sheet
   * @param {object} req
   * @param {object} res
   * @returns {object} meet_sheet object
   */
  create: (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(req, res) {
        var text, values, _ref2, rows;

        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  text =
                    "INSERT INTO meet_sheet (player, meet, scored_goals, conceded_goals, won)\n\t    VALUES($1, $2, $3, $4, $5)\n        returning *";
                  values = [req.body.player_mail_adress,
                   req.body.meet_id, 
                   req.body.scored_goals, 
                   req.body.conceded_goals, 
                   req.body.won];
                  _context.prev = 2;
                  _context.next = 5;
                  return _db2.default.query(text, values);

                case 5:
                  _ref2 = _context.sent;
                  rows = _ref2.rows;
                  return _context.abrupt(
                    "return",
                    res.status(201).send(rows[0])
                  );

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](2);
                  return _context.abrupt(
                    "return",
                    res.status(400).send(_context.t0)
                  );

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          },
          _callee,
          this,
          [[2, 10]]
        );
      })
    );

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  })(),

  /**
   * Get All meet_sheets
   * @param {object} req
   * @param {object} res
   * @returns {object} meet_sheets array
   */
  getAll: (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(req, res) {
        var findAllQuery, _ref4, rows, rowCount;

        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  findAllQuery = "SELECT * FROM meet_sheet";
                  _context2.prev = 1;
                  _context2.next = 4;
                  return _db2.default.query(findAllQuery);

                case 4:
                  _ref4 = _context2.sent;
                  rows = _ref4.rows;
                  rowCount = _ref4.rowCount;
                  return _context2.abrupt(
                    "return",
                    res.status(200).send({ rows: rows, rowCount: rowCount })
                  );

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt(
                    "return",
                    res.status(400).send(_context2.t0)
                  );

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          },
          _callee2,
          this,
          [[1, 10]]
        );
      })
    );

    function getAll(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return getAll;
  })(),

  /**
   * Get A meet_sheet
   * @param {object} req
   * @param {object} res
   * @returns {object} meet_sheet object
   */
  getOne: (function() {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(req, res) {
        var text, _ref6, rows;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  text = "SELECT * FROM meet_sheet WHERE player = $1";
                  _context3.prev = 1;
                  _context3.next = 4;
                  return _db2.default.query(text, [req.params.player_mail_adress]);

                case 4:
                  _ref6 = _context3.sent;
                  rows = _ref6.rows;

                  if (rows[0]) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt(
                    "return",
                    res.status(404).send({ message: "meet_sheet not found" })
                  );

                case 8:
                  return _context3.abrupt(
                    "return",
                    res.status(200).send(rows[0])
                  );

                case 11:
                  _context3.prev = 11;
                  _context3.t0 = _context3["catch"](1);
                  return _context3.abrupt(
                    "return",
                    res.status(400).send(_context3.t0)
                  );

                case 14:
                case "end":
                  return _context3.stop();
              }
            }
          },
          _callee3,
          this,
          [[1, 11]]
        );
      })
    );

    function getOne(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getOne;
  })(),

  /**
   * Update A meet_sheet
   * @param {object} req
   * @param {object} res
   * @returns {object} updated meet_sheet
   */
  update: (function() { // TO DO

  })(),

  /**
   * Delete A meet_sheet
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  delete: (function() {
    var _ref9 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(req, res) {
        var deleteQuery, _ref10, rows;

        return regeneratorRuntime.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  deleteQuery = "DELETE FROM meet_sheet WHERE player=$1 returning *";
                  _context5.prev = 1;
                  _context5.next = 4;
                  return _db2.default.query(deleteQuery, [req.params.player_mail_adress]);

                case 4:
                  _ref10 = _context5.sent;
                  rows = _ref10.rows;

                  if (rows[0]) {
                    _context5.next = 8;
                    break;
                  }

                  return _context5.abrupt(
                    "return",
                    res.status(404).send({ message: "meet_sheet not found" })
                  );

                case 8:
                  return _context5.abrupt(
                    "return",
                    res.status(204).send({ message: "deleted" })
                  );

                case 11:
                  _context5.prev = 11;
                  _context5.t0 = _context5["catch"](1);
                  return _context5.abrupt(
                    "return",
                    res.status(400).send(_context5.t0)
                  );

                case 14:
                case "end":
                  return _context5.stop();
              }
            }
          },
          _callee5,
          this,
          [[1, 11]]
        );
      })
    );

    function _delete(_x9, _x10) {
      return _ref9.apply(this, arguments);
    }

    return _delete;
  })()
};

exports.default = Meet_sheet;
