const { execSync } = require("child_process");

const { sftpServer, backupsServer } = require("../../config");


module.exports = {

  getAllBackups: (req, res) => {
    let dir = '/home/xarxes/backups/'+req.user.username
    let script = 'ssh xarxes@'+backupsServer+' find '+dir+' -mindepth 1 -maxdepth 1 ! -type l';
    
    try {
      let result = execSync(script);
      let names = result.toString().replaceAll(dir+'/', '');
      let list = names.split("\n");
      list = list.filter(n => n);
      
      return res.status(200).json({
        status: true,
        data: list,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        error: {
            message: `Internal server error`,
        },
      });
    }
  },
  getBackupDir: (req, res) => {
    const {
      params: { backup, dirName }
    } = req;

    let dir = '/home/xarxes/backups/'+req.user.username+'/'+backup+'/'+dirName;
    let script = 'ssh xarxes@'+backupsServer+' find '+dir+' -mindepth 1 -maxdepth 1 ! -type l';
    
    try {
      let result = execSync(script);
      let names = result.toString().replaceAll(dir+'/', '');
      let list = names.split("\n");
      list = list.filter(n => n);
      
      return res.status(200).json({
        status: true,
        data: list,
      });

    } catch (error) {
      
      if(error.status === 1) {
        return res.status(400).json({
          status: false,
          error: {
              message: `Folder doesn't exist.`,
          },
        });
      }
      else {
        console.error(error);
        return res.status(500).json({
          status: false,
          error: {
              message: `Internal server error`,
          },
        });
      }
    }
  },
}