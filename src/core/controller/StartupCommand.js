import { MacroCommand } from 'pmvc';
import NotificationNames from '../constants/NotificationNames';
import { ModelPrepCommand, ViewPrepCommand } from '../../controller/prep-commands';

export default class StartupCommand extends MacroCommand {

  initializeMacroCommand() {
    this.addSubCommand(ModelPrepCommand);
    this.addSubCommand(ViewPrepCommand);
  }

  execute(note) {
   // console.log('StartupCommand execute()');
    super.execute(note);
    this.facade.removeCommand(NotificationNames.STARTUP);
    this.facade.send(NotificationNames.RENDER);
  }
}

