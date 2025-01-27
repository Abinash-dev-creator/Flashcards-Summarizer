const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY;
console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: "i will give you long text of youtube subtitle, make it consise and make 5 flash cards only of important points only",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: "on for Visa I would like these radio buttons within different groups we need to create two different groups and add them accordingly here&amp;#39;s how within our Constructor we will access self declare a button group let&amp;#39;s name it button group one for Simplicity equals call The Constructor of the class Q button group then pass in to set the parent widget to be the window then we will create button group two we&amp;#39;re going to access self select the radio button group button group one call the add button method then pass in a radio button self. Radio 1 then we&amp;#39;ll add Radio 2 and radio 3 we&amp;#39;ll select button group two this time button group two add radio button 4 and radio button 5 the first three radio buttons are within the same group radio buttons 4 and five are within a different group we can only select one radio button from any one radio button group maybe I would like to pay with a Visa card in store or a master card online or a gift card in store these radio buttons are within different button groups we&amp;#39;re limited to one selection in any one radio button group when we select these radio buttons they don&amp;#39;t quite do anything for each radio button we have to connect a signal to a slot here&amp;#39;s how let&amp;#39;s define a method of radio button changed there will be no parameters beside self temporarily I&amp;#39;ll write pass we&amp;#39;ll fill this in in a moment we will take each radio button let&amp;#39;s start with radio one Radio One the signal will be toggled when this radio button is toggled we will connect a slot we will pass in a function or a method self dot radio button changed then we will do this with the other radio buttons one through five let&amp;#39;s print a test message you selected something just to be sure that everything is working you selected something okay we know that that works currently what we&amp;#39;re going to need to do is get the sender widget which radio button sent the signal of toggled I will create a local radio button to store that radio button whichever one emitted the signal we can determine that with self. sender method the sender method is going to return the widget that sent the signal so if we select radio button one our radio button will be radio button one if it was five then it&amp;#39;s five in this case then we&amp;#39;ll determine if our radio button is checked take our radio button use the is checked method this will return a Boolean true or false if it&amp;#39;s checked if this returns true then let&amp;#39;s print the following I&amp;#39;ll use an F string we will get the text of the radio button radio button called the text method to return the text of the radio button is selected all right then let&amp;#39\n" },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Okay, here's a concise breakdown of the provided text into flashcard-style points:\n\n*Flashcard 1\n\n   *Front:* How to create radio button groups in a GUI.\n*   *Back:*\n    *   Use QButtonGroup class.\n    *   Create separate QButtonGroup objects for different groups.\n    *   Pass the parent widget (e.g., window) to the QButtonGroup constructor.\n\n*Flashcard 2\n\n   *Front:* How to add radio buttons to a group.\n*   *Back:*\n    *   Use the addButton() method of the QButtonGroup class.\n    *   Pass the radio button object (e.g., self.radio1) to the method.\n\n*Flashcard 3\n\n   *Front:* How do radio button groups enforce single selection?\n*   *Back:* Only one radio button can be selected within a single QButtonGroup.\n\n*Flashcard 4\n\n   *Front:* How to make radio buttons interactive?\n*   *Back:*\n    *   Connect the toggled signal of each radio button to a slot (function/method).\n\n*Flashcard 5\n\n   *Front:* How to find out which radio button triggered a signal?\n*   *Back:*\n    *   Use the self.sender() method within the slot function.\n    *   This returns the widget that emitted the signal (e.g., a specific radio button).\n\n*Flashcard 6\n\n   *Front:* How to determine if a radio button is checked?\n*   *Back:*\n    *   Use the is_checked() method of the radio button object.\n    *   Returns True if checked, False otherwise.\n\n*Flashcard 7\n\n   *Front:* How to get the text of the selected radio button\n*  *Back:*\n    * Use the .text() method of the radio button object\n    * This will return the string of the radio button text.\n\n*Simplified Example Code*\n\npython\nfrom PyQt5.QtWidgets import QWidget, QRadioButton, QVBoxLayout, QButtonGroup\nfrom PyQt5.QtCore import pyqtSlot\n\nclass MyWindow(QWidget):\n    def __init__(self):\n        super().__init__()\n        self.setWindowTitle(\"Radio Button Groups\")\n\n        self.layout = QVBoxLayout()\n        self.setLayout(self.layout)\n       \n        #Radio Buttons\n        self.radio1 = QRadioButton(\"Visa in store\")\n        self.radio2 = QRadioButton(\"Mastercard online\")\n        self.radio3 = QRadioButton(\"Giftcard in store\")\n        self.radio4 = QRadioButton(\"Shipping\")\n        self.radio5 = QRadioButton(\"Pickup\")\n\n\n        self.layout.addWidget(self.radio1)\n        self.layout.addWidget(self.radio2)\n        self.layout.addWidget(self.radio3)\n        self.layout.addWidget(self.radio4)\n        self.layout.addWidget(self.radio5)\n\n\n        # Button Groups\n        self.button_group_1 = QButtonGroup(self)\n        self.button_group_2 = QButtonGroup(self)\n\n\n        # Add to Button groups\n        self.button_group_1.addButton(self.radio1)\n        self.button_group_1.addButton(self.radio2)\n        self.button_group_1.addButton(self.radio3)\n        self.button_group_2.addButton(self.radio4)\n        self.button_group_2.addButton(self.radio5)\n\n\n        #Connect\n        self.radio1.toggled.connect(self.radio_button_changed)\n        self.radio2.toggled.connect(self.radio_button_changed)\n        self.radio3.toggled.connect(self.radio_button_changed)\n        self.radio4.toggled.connect(self.radio_button_changed)\n        self.radio5.toggled.connect(self.radio_button_changed)\n\n    @pyqtSlot()\n    def radio_button_changed(self):\n        radio_button = self.sender()\n        if radio_button.isChecked():\n            print(f\"{radio_button.text()} is selected\")\n\nif __name__ == '__main__':\n    from PyQt5.QtWidgets import QApplication\n    import sys\n    app = QApplication(sys.argv)\n    window = MyWindow()\n    window.show()\n    sys.exit(app.exec_())\n\n\n*Key Concepts Highlighted\n\n   **QButtonGroup:** The class responsible for managing radio button groups.\n*   **addButton():** Method to add a radio button to a group.\n*   **toggled Signal:** Signal emitted when a radio button's state changes.\n*   **sender():** Method to retrieve the widget that triggered a signal.\n*   **is_checked():** Method to check if a radio button is selected.\n*   **text():** Method to get the text of the radio button.\n*   **pyqtSlot:** Decorator for functions that are slots.\n    \nLet me know if you'd like more detail on any of these points!\n" },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());
  return result.response.text();
}

run("how to love someone");

module.exports = { run };