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
      if(error.status === 1) {
        return res.status(400).json({
          status: false,
          error: {
              message: `There are no backups.`,
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
  getFilesBackups: (req, res) => {
    let dir = '/home/xarxes/backups/'+req.user.username
    let script = 'ssh xarxes@'+backupsServer+' find '+dir+' -mindepth 1 -maxdepth 1 ! -type l';
    
    try {
      let result = execSync(script);
      let names = result.toString().replaceAll(dir+'/', '');
      let list = names.split("\n");
      list = list.filter(n => n && n.match('^\\d{4}-\\d{2}-\\d{2}_\\d{2}-\\d{2}') );
      
      list = list.sort((a1,a2) => {
        if(a1 < a2) return 1;
        else if (a2 == a1) return 0;
        else return -1;
      });      

      return res.status(200).json({
        status: true,
        data: list,
      });

    } catch (error) {
      if(error.status === 1) {
        return res.status(400).json({
          status: false,
          error: {
              message: `There are no backups.`,
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
  getDbBackups: (req, res) => {
    let dir = '/home/xarxes/backups/'+req.user.username
    let script = 'ssh xarxes@'+backupsServer+' find '+dir+' -mindepth 1 -maxdepth 1 ! -type l';
    
    try {
      let result = execSync(script);
      let names = result.toString().replaceAll(dir+'/', '');
      let list = names.split("\n");
      list = list.filter(n => n && n.match('^db_\\d{4}-\\d{2}-\\d{2}_\\d{2}-\\d{2}') );
      
      list = list.sort((a1,a2) => {
        if(a1 < a2) return 1;
        else if (a2 == a1) return 0;
        else return -1;
      });

      return res.status(200).json({
        status: true,
        data: list,
      });

    } catch (error) {
      if(error.status === 1) {
        return res.status(400).json({
          status: false,
          error: {
              message: `There are no backups.`,
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
  getBackupDir: (req, res) => {
    const { backup } = req.params;
    const { name } = req.body;

    let dir = '/home/xarxes/backups/'+req.user.username+'/'+backup;
    dir += name ? '/'+name : '';
    let script = `ssh xarxes@`+backupsServer+` find `+dir+` -mindepth 1 -maxdepth 1 ! -type l -type d -printf '%p/' , ! -type d -print `;
    
    try {
      let result = execSync(script);
      let names = result.toString().replaceAll(dir+'/', '');
      let list = names.split("\n");
      list = list.filter(n => n);

      list = list.sort((a1,a2) => {
        if(a1 < a2) return 1;
        else if (a2 == a1) return 0;
        else return -1;
      });
            
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
  recoverDB: (req, res) => {
    const { name } = req.body;

    let file = '/home/xarxes/backups/'+req.user.username+'/'+name;
    let cmdExists = 'ssh xarxes@'+backupsServer+' ls '+file;
    
    try {
      let result = execSync(cmdExists);

      //If it doesn't fail, file exists
      let recover = 'ssh xarxes@'+backupsServer+' /home/xarxes/scripts/recover_db.sh '+req.user.username+' '+name;
      result = execSync(recover);

      return res.status(200).json({
        status: true
      });

    } catch (error) {
      
      if(error.status === 2) {
        return res.status(400).json({
          status: false,
          error: {
              message: `File doesn't exist.`,
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
  recoverFiles: (req, res) => {
    const { backup, dir, file, isDir } = req.body;

    let path = '/home/xarxes/backups/'+req.user.username+'/'+backup+'/'+dir+'/'+file;
    let cmdExists = 'ssh xarxes@'+backupsServer+' ls '+path;
    
    try {
      let result = execSync(cmdExists);

      //If it doesn't fail, file exists
      let recover = 'ssh xarxes@'+backupsServer+' /home/xarxes/scripts/recover_files.sh '+req.user.username+' '+backup+' '+dir+' '+file+' '+(isDir ? "1" : "0");
      result = execSync(recover);

      return res.status(200).json({
        status: true
      });

    } catch (error) {
      
      if(error.status === 2) {
        return res.status(400).json({
          status: false,
          error: {
            message: `File doesn't exist.`,
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