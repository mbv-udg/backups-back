const jwt = require("jsonwebtoken");
const { execSync } = require("child_process");

const { jwtSecret, jwtExpirationInSeconds, sftpServer } = require("../../config");

// Generates an Access Token using username and userId for the user's authentication
const generateAccessToken = (username) => {
  return jwt.sign(
    {
      username,
    },
      jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

module.exports = {
  
  login: (req, res) => {
    const { username, password } = req.body;

    // Check if credentials are correct with a shell script
    let script = '/home/xarxes/server/scripts/check_credentials.sh '+username+' '+password+' '+sftpServer;
    try {
      execSync(script);
    } catch (error) {
      if(error.status === 1) {
          return res.status(500).json({
              status: false,
              error: {
                  message: `Internal server error`,
              },
          });
      }
      else if(error.status === 2){
          return res.status(400).json({
              status: false,
              error: {
                  message: `Provided username and password did not match.`,
              },
          });
      }
    }

    // Generating an AccessToken for the user, which will be
    // required in every subsequent request.
    const accessToken = generateAccessToken(username);

    return res.status(200).json({
        status: true,
        data: {
            user: username,
            token: accessToken,
        },
    });

  },
};