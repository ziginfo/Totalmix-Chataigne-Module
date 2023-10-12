# RME-Totalmix control with chataigne
OSC ports must be set right in Totalmix;  defaults are Incoming : 8000 and outgoing : 9000
and OSC must be enabled in the "Option" Menu of Totalmix !

Totalmix allows you to manage almost all RME sound cards; it is a virtual mixer, but also a full matrix mixing console, which makes the remote control, notably by OSC and Chataigne, quite complex!!
You have to be very careful because most commands are not absolute (-> not concerning one only single channel) but relative. This means a given command concerns a given Channel (first, second, third etc) on a given layer and routed to a given Submix... all of them are freely assignable !! The channel assignment depends on which layer is activated (Inputs, Playbacks or Outputs), but also which Submix is activated to determine which channel sends to which Submix!
The OSC controls are defined on two Pages (Page1 for the Mixer and Page2 for the Active Channel -> Selected Channel). Which can be a bit confusing in the beginning !

If you are not familiar with the concept of Matrix-Mixing, try to start with the Template-Session. You'll find very usefull Channel Informations in the Dashboard. of this session.

All EQ, Compressor, Gate settings only affect the currently active channel. 
Furthermore, all EQ, Compression, Gate and also FX (Reverb and Delay) settings only concern interfaces with DSP (like UCX and UFX etc).
The Player settings (Play, Stop, Record etc.) only concern the UFX !


Totalmix permet de gérer presque toutes les cartes son RME ; c'est une table de mixage virtuelle, mais aussi une console de mixage full matricielle, ce qui rend la télécommande, notamment par OSC et Chataigne, assez complexe !!
Il faut rester vigilant, car la plupart des commandes ne sont pas absolues (-> ne concernent pas un seul et unique canal) mais sont relatives. Cela signifie qu'une commande donnée concerne un canal donné (premier, deuxième, troisième etc) sur un Layer donné (Input, Playback ou Output) et envoyant vers un Submix donné... tous sont librement assignables !! L'affectation des canaux dépend du Layer activé (-> Inputs, Playbacks ou Outputs), mais aussi du Submix activé pour déterminer quel canal envoie vers quel Submix !
Les contrôles OSC sont définis sur deux pages : Page1 pour le mixeur et Page2 pour le canal actif/sélectionné. Ce qui peut être un peu déroutant au début !

Si vous n'êtes pas familier avec le concept de Matrix-Mixing, vous pouvez commencer par la Template-Session. Vous trouverez des informations très utiles sur les chaînes dans le tableau de bord (Dashboard) de cette session.

Tous les réglages d'EQ, Compresseur, de Gate etc n'affectent toujours seulement le canal actuellement activé/sélectionné. Il faut donc rester vigilant !
En outre, tous les réglages d'EQ, Compression, Gate et également des FX (Reverbe et Delay) ne concernent que les interfaces avec DSP (comme les UCX et UFX etc).
Les réglages de Player (Play, Stop, Record etc) ne concernent que la UFX !
