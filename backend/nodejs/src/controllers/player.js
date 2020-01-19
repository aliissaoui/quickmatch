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

var Player = {
  /**
   * Create A Player
   * @param {object} req
   * @param {object} res
   * @returns {object} Player object
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
                    "INSERT INTO Player (surname, first_name, mail_address, phone_number, pseudo, mdp, avatar)\n\t VALUES($1, $2, $3, $4, $5, $6, $7)\n RETURNING *";
                  values = [
                    req.body.surname,
                    req.body.first_name,
                    req.body.mail_address,
                    req.body.phone_number,
                    req.body.pseudo,
                    req.body.mdp,
                    req.body.avatar
                  ];
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
                    res.status(200).send(_context.t0)
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
   * Get All players
   * @param {object} req
   * @param {object} res
   * @returns {object} players array
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
                  findAllQuery = "SELECT * FROM player";
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
   * Get A Player
   * @param {object} req
   * @param {object} res
   * @returns {object} player object
   */
  getByMail: (function() {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(req, res) {
        var text, _ref6, rows;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  text = "SELECT * FROM player WHERE mail_address = $1";
                  _context3.prev = 1;
                  _context3.next = 4;
                  return _db2.default.query(text, [req.params.mail_address]);

                case 4:
                  _ref6 = _context3.sent;
                  rows = _ref6.rows;

                  if (rows[0]) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt(
                    "return",
                    res.status(200).send({ message: "player not found" })
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
   * Get A Player Stat per match
   * @param {object} req
   * @param {object} res
   * @returns {object} player object
   */
  getByMailStat: (function() {
    var _ref30 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee20(req, res) {
        var findAllQuery, _ref40, rows, rowCount;

        return regeneratorRuntime.wrap(
          function _callee20$(_context20) {
            while (1) {
              switch ((_context20.prev = _context20.next)) {
                case 0:
                  findAllQuery =
                    "SELECT M.won, M.scored_goals, M.conceded_goals FROM player P JOIN meet_sheet M ON P.id=M.player WHERE mail_address = $1";
                  _context20.prev = 1;
                  _context20.next = 4;
                  return _db2.default.query(findAllQuery);

                case 4:
                  _ref40 = _context20.sent;
                  rows = _ref40.rows;
                  rowCount = _ref40.rowCount;
                  return _context20.abrupt(
                    "return",
                    res.status(200).send({ rows: rows, rowCount: rowCount })
                  );

                case 10:
                  _context20.prev = 10;
                  _context20.t0 = _context20["catch"](1);
                  return _context20.abrupt(
                    "return",
                    res.status(400).send(_context20.t0)
                  );

                case 13:
                case "end":
                  return _context20.stop();
              }
            }
          },
          _callee20,
          this,
          [[1, 10]]
        );
      })
    );

    function getByMailStat(_x30, _x40) {
      return _ref30.apply(this, arguments);
    }

    return getByMailStat;
  })(),

  /**
   * Get A Player
   * @param {object} req
   * @param {object} res
   * @returns {object} player object
   */
  getByID: (function() {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(req, res) {
        var text, _ref6, rows;

        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  text = "SELECT * FROM player WHERE id = $1";
                  _context3.prev = 1;
                  _context3.next = 4;
                  return _db2.default.query(text, [req.params.id]);

                case 4:
                  _ref6 = _context3.sent;
                  rows = _ref6.rows;

                  if (rows[0]) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt(
                    "return",
                    res.status(200).send({ message: "player not found" })
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

    function getByID(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getByID;
  })(),

  /**
   * Update A Player
   * @param {object} req
   * @param {object} res
   * @returns {object} updated Player
   */
  update: (function() {
    var _ref7 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(req, res) {
        var findOneQuery, updateOneQuery, _ref8, rows, values, response;

        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  findOneQuery = "SELECT * FROM player WHERE id=$1";
                  updateOneQuery =
                    "UPDATE player\n      SET pseudo=$1, surname=$2,first_name=$3,mail_address=$4,phone_number=$5, bio=$6, avatar=$7\n      WHERE id=$8 returning *";
                  _context4.prev = 2;
                  _context4.next = 5;
                  return _db2.default.query(findOneQuery, [req.params.id]);

                case 5:
                  _ref8 = _context4.sent;
                  rows = _ref8.rows;

                  if (rows[0]) {
                    _context4.next = 9;
                    break;
                  }

                  return _context4.abrupt(
                    "return",
                    res.status(404).send({ message: "player not found" })
                  );

                case 9:
                  values = [
                    req.body.pseudo || rows[0].pseudo,
                    req.body.surname || rows[0].surname,
                    req.body.first_name || rows[0].first_name,
                    req.body.mail_address || rows[0].mail_address,
                    req.body.phone_number || rows[0].phone_number,
                    req.body.bio || rows[0].bio,
                    req.body.avatar || rows[0].avatar,
                    req.params.id
                  ];
                  _context4.next = 12;
                  return _db2.default.query(updateOneQuery, values);

                case 12:
                  response = _context4.sent;
                  return _context4.abrupt(
                    "return",
                    res.status(200).send(response.rows[0])
                  );

                case 16:
                  _context4.prev = 16;
                  _context4.t0 = _context4["catch"](2);
                  return _context4.abrupt(
                    "return",
                    res.status(200).send(_context4.t0)
                  );

                case 19:
                case "end":
                  return _context4.stop();
              }
            }
          },
          _callee4,
          this,
          [[2, 16]]
        );
      })
    );

    function update(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return update;
  })(),

  /**
   * Delete A Player
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
                  deleteQuery =
                    "DELETE FROM player WHERE mail_address=$1 returning *";
                  _context5.prev = 1;
                  _context5.next = 4;
                  return _db2.default.query(deleteQuery, [
                    req.params.mail_address
                  ]);

                case 4:
                  _ref10 = _context5.sent;
                  rows = _ref10.rows;

                  if (rows[0]) {
                    _context5.next = 8;
                    break;
                  }

                  return _context5.abrupt(
                    "return",
                    res.status(404).send({ message: "player not found" })
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

exports.default = Player;
