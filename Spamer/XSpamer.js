
/*
 * 
 *  ____  ___  _________                                         
 *  \   \/  / /   _____/______  _____    _____    ____  _______ 
 *   \     /  \_____  \ \____ \ \__  \  /     \  / __ \ \_  __ \
 *  /     \  /        \|  |_> > / __ \_|  Y Y  \\  ___/  |  | \/
 * /___/\  \/_______  /|   __/ (____  /|__|_|  / \___  > |__|   
 *       \_/        \/ |__|         \/       \/      \/         
 */

//ModPE.langEdit("menu.copyright","§cX§eSpamer"); 

var xlogo = android.os.Environment.getExternalStorageDirectory() + "/games/Spamer/img/logo.jpg";
var mojang = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Button = android.widget.Button;
var LinearLayout = android.widget.LinearLayout;
var RelativeLayout = android.widget.RelativeLayout;
var BitmapFactory = android.graphics.BitmapFactory;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var PopupWindow = android.widget.PopupWindow;
var ScrollView = android.widget.ScrollView;
var Dialog = android.app.Dialog;
var Handler = android.os.Handler;
var TextView = android.widget.TextView;
var EditText = android.widget.EditText;
var Toast = android.widget.Toast;
var Runnable = java.lang.Runnable;
var File = java.io.File;
var View = android.view.View;
var ColorDrawable = android.graphics.drawable.ColorDrawable;
var Color = android.graphics.Color;
var Gravity = android.view.Gravity;

var XSpamer = new function() {
    
    this.description = {
        author: function() {
            return "RoLLy";
        },
        
        type: function() {
            return "Script-BL";
        },
        
        version: function() {
            return "0.1";
        },
        
        website: function() {
            return {
                vk: "vk.com/rollylni",
                github: "github.com/Rollylni"
            }
        }
    };
    
    this.messages = {
        result: true,
        errors: true,
        newLevel: true
    };
    
    this.spamm = false;
    this.logo = null;
    this.dialog = null;
    this.layout = null;
    this.context = null;
    this.interval = null;
    this.message = null;
    this.count = null;
    this.start = null;
    this.handler = null;
    
    this.counter = 0;
    this.time = 0;
    
    this.show = function(spam) {
        mojang.runOnUiThread(new Runnable({
            run: function() {
                spam.xlogo = new File(xlogo);
                spam.handler = new Handler();
                spam.layout = new LinearLayout(mojang);
                spam.layout.setOrientation(LinearLayout.VERTICAL);
            
                spam.logo = new Button(mojang);
                if(spam.xlogo.exists()) {
                    spam.logo.setBackgroundDrawable(BitmapDrawable(BitmapFactory.decodeFile(xlogo)));
                } else {
                    spam.logo.setText("XSpamer");
                    spam.logo.setTextSize(15);
                    spam.logo.setTextColor(Color.RED);
                }
                spam.logo.setOnClickListener(new View.OnClickListener({
                    onClick: function(v) {
                        spam.showForm(spam);
                    }
                }));
                spam.layout.addView(spam.logo);
            
                spam.context = new PopupWindow(spam.layout, RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT);
                spam.context.showAtLocation(mojang.getWindow().getDecorView(), Gravity.RIGHT | Gravity.CENTER, 0, 0);
            }
        }));
    }
    
    this.showForm = function(spam) {
        mojang.runOnUiThread(new Runnable({
            run: function() {
                spam.form = new LinearLayout(mojang);
                spam.form.setOrientation(LinearLayout.VERTICAL); 
                
                if(spam.spamm) {
                    spam.dialog = new Dialog(mojang);
                    spam.dialog.setTitle("Spaming...");
                    spam.dialog.setContentView(spam.form) 
                    spam.dialog.show();
                    
                    spam.uptime = new TextView(mojang);
                    spam.uptime.setText("uptime: " + spam.time / 1000);
                    spam.uptime.setTextSize(20);
                    spam.uptime.setTextColor(Color.BLACK);
                    spam.form.addView(spam.uptime);
                
                    spam.sending = new TextView(mojang);
                    spam.sending.setText("sending: " + spam.counter);
                    spam.sending.setTextSize(20);
                    spam.sending.setTextColor(Color.BLACK);
                    spam.form.addView(spam.sending);
                    
                    spam.ending = new TextView(mojang);
                    spam.ending.setText("ending: " + (Number(spam.count.getText()) <= 0 ? "∞" : spam.count.getText()));
                    spam.ending.setTextSize(20);
                    spam.ending.setTextColor(Color.BLACK);
                    spam.form.addView(spam.ending);
                
                    spam.start = new Button(mojang);
                    spam.start.setText("stop!");
                    spam.start.setTextSize(20);
                    spam.start.setTextColor(Color.RED);
                    spam.start.setOnClickListener(new View.OnClickListener({
                        onClick: function(v) {
                            spam.dialog.dismiss();
                            spam.sstart(spam);
                        }
                    }));
                    spam.form.addView(spam.start);
                } else {
                    spam.dialog = new Dialog(mojang);
                    spam.dialog.setTitle("Spamer");
                    spam.dialog.setContentView(spam.form) 
                    spam.dialog.show();
                
                    spam.interval = new EditText(mojang);
                    spam.interval.setHint("interval (milliseconds)");
                    spam.form.addView(spam.interval);
                
                    spam.count = new EditText(mojang);
                    spam.count.setHint("messages count");
                    spam.form.addView(spam.count);
                
                    spam.message = new EditText(mojang);
                    spam.message.setHint("text");
                    spam.form.addView(spam.message);
                
                    spam.start = new Button(mojang);
                    spam.start.setText("start!");
                    spam.start.setTextSize(20);
                    spam.start.setTextColor(Color.GREEN);
                    spam.start.setOnClickListener(new View.OnClickListener({
                        onClick: function(v) {
                            spam.sstart(spam);
                            spam.dialog.dismiss();
                        }
                    }));
                    spam.form.addView(spam.start);
                }
            }
        }));
    }
    
    this.sstart = function(spam) {
        mojang.runOnUiThread(new Runnable({
            run: function() {
                try {
                    if(spam.spamm) {
                        spam.handler.removeCallbacksAndMessages(null);
                        if(spam.messages.result) {
                            clientMessage("§c---------------");
                            clientMessage("sended: §e" + spam.counter);
                            clientMessage("uptime: §a" + spam.time / 1000);
                            clientMessage("§c---------------");
                        }
                        spam.dialog.dismiss();
                        spam.showResult(spam);
                        spam.spamm = false;
                    } else {
                        spam.counter = 0;
                        spam.time = 0;
                        spam.spamm = true;
                        spam.handle(spam);
                    }
                } catch(e) {
                    Toast.makeText(mojang, "Error: " + e, 1).show();
                    if(spam.messages.errors) {
                        clientMessage("§cError: " + e)
                    }
                    spam.spamm = false;
                }
            }
        }));
    }
    
    this.showResult = function(spam) {
        mojang.runOnUiThread(new Runnable({
            run: function() {
                spam.form = new LinearLayout(mojang);
                spam.form.setOrientation(LinearLayout.VERTICAL); 
                
                spam.dialog = new Dialog(mojang);
                spam.dialog.setTitle("Result");
                spam.dialog.setContentView(spam.form) 
                spam.dialog.show();
                
                spam.interval = new TextView(mojang);
                spam.interval.setText("uptime: " + spam.time / 1000);
                spam.interval.setTextSize(20);
                spam.interval.setTextColor(Color.BLACK);
                spam.form.addView(spam.interval);
                
                spam.count = new TextView(mojang);
                spam.count.setText("sended: " + spam.counter);
                spam.count.setTextSize(20);
                spam.count.setTextColor(Color.BLACK);
                spam.form.addView(spam.count);
                
                spam.text = new TextView(mojang);
                spam.text.setText("text: " + spam.message.getText());
                spam.text.setTextSize(20);
                spam.text.setTextColor(Color.BLACK);
                spam.form.addView(spam.text);
                
                spam.ok = new Button(mojang);
                spam.ok.setText("ok!");
                spam.ok.setTextSize(20);
                spam.ok.setTextColor(Color.GREEN);
                spam.ok.setOnClickListener(new View.OnClickListener({
                    onClick: function(v) {
                        spam.dialog.dismiss();
                    }
                }));
                spam.form.addView(spam.ok);
            }
        }));
    }
    
    this.handle = function(spam) {
        mojang.runOnUiThread(new Runnable({
            run: function() {
                try {
                    spam.handler.postDelayed(new Runnable({
                        run: function() {
                            Server.sendChat(spam.message.getText());
                            spam.counter++;
                            spam.time += Number(spam.interval.getText()) == 0 ? 1 : Number(spam.interval.getText());
                            if(spam.uptime && spam.sending) {
                                spam.uptime.setText("uptime: " + spam.time / 1000);
                                spam.sending.setText("sending: " + spam.counter);
                            } 
                            
                            if(spam.counter >= Number(spam.count.getText()) && Number(spam.count.getText()) > 0) {
                                spam.sstart(spam);
                            } else {
                                eval(spam.handle(spam))
                            }
                        }
                    }), Number(spam.interval.getText()));
                } catch(e) {
                    Toast.makeText(mojang, "Error: " + e, 1).show();
                    if(spam.messages.errors) {
                        clientMessage("§cError: " + e);
                    }
                    spam.spamm = false;
                }
            }
        }));
    }
    
    this.close = function(spam) {
        mojang.runOnUiThread(new Runnable({
            run: function() {
               if(spam.context) {
                    spam.context.dismiss()
                    spam.context = null;
                }
                
                if(spam.dialog) {
                    spam.dialog.dismiss()
                    spam.dialog = null;
                }
                spam.spamm = false;
            }
        }));
    }
};

function newLevel() {
    try {
        XSpamer.show(XSpamer)
    } catch(e) {
        Toast.makeText(mojang, "Error: " + e, 1).show();
        if(XSpamer.messages.errors) {
            clientMessage("§cError: " + e);
        }
    }
    
    if(XSpamer.messages.newLevel) {
        clientMessage("§cXSpamer §aby RoLLy Enabled!")
    }
}

function leaveGame() {
    try {
        XSpamer.close(XSpamer)
    } catch(e) {
        Toast.makeText(mojang, "Error: " + e, 1).show();
    }
}