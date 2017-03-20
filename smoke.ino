int D_FLAT_PIN  = 2;
int F_FLAT_PIN  = 3;
int G_FLAT_PIN  = 4;
int G_SHARP_PIN = 5;
int BUZZER_PIN  = 9;

int NOTE_D4     = 294;
int NOTE_F4     = 349;
int NOTE_G4     = 392;
int NOTE_GS4    = 415;

void setup() {
  pinMode(D_FLAT_PIN,   INPUT);
  pinMode(F_FLAT_PIN,   INPUT);
  pinMode(G_FLAT_PIN,   INPUT);
  pinMode(G_SHARP_PIN,  INPUT);
  pinMode(BUZZER_PIN,  OUTPUT);
}

void loop() {
  if (digitalRead(D_FLAT_PIN) == HIGH) {
    tone(BUZZER_PIN, NOTE_D4);
  }
  else if (digitalRead(F_FLAT_PIN) == HIGH) {
    tone(BUZZER_PIN, NOTE_F4);
  }
  else if (digitalRead(G_FLAT_PIN) == HIGH) {
    tone(BUZZER_PIN, NOTE_G4);
  }
  else if (digitalRead(G_SHARP_PIN) == HIGH) {
    tone(BUZZER_PIN, NOTE_GS4);
  }
  else {
    noTone(BUZZER_PIN);
  }
}
