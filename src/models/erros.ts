import { AlertController } from 'ionic-angular';

constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
}

alertaErro(mensagem) {
    if (mensagem.code == 'auth/argument-error') {
      this.tituloErro = 'Campos não inseridos';
      this.mesagemErro = 'Insira um valor nos campos';
    } else if (mensagem.code == 'auth/argument-error') {
      this.tituloErro = 'Campos não inseridos';
      this.mesagemErro = 'Insira um valor nos campos';
    } else {
      this.tituloErro = mensagem.code;
      this.mesagemErro = mensagem.message;
    }
    let alert = this.alertCtrl.create({
      title: this.tituloErro,
      subTitle: this.mesagemErro,
      buttons: ['Dismiss']
    });
    alert.present();
  }