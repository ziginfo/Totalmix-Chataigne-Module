# RME-Totalmix control by OSC with chataigne
OSC ports must be set right in Totalmix;  defaults are Incoming : 8000 and outgoing : 9000
and OSC must be enabled in the "Option" Menu and "Settings" and "OSC-Tab" of Totalmix !
The Bank value can bet set at any number of Faders (in this same "OSC-Tab").

Totalmix allows you to manage almost all RME sound cards; it is a full matrix virtual mixing console,  which makes the remote control, notably by OSC and Chataigne, quite complex!!
Most commands are not absolute (-> do not adress to a given single channel) but they are "relative". This means a given command concerns a given Channel (first, second, third etc) on a given layer and routed to a given Submix... all of them are freely assignable !! Its just a full "Matrix-Affair" ! 

All EQ, Compressor, Gate settings only affect the currently active/selected channel. 
Furthermore, all EQ, Compression, Gate and also FX (Reverb and Delay) settings only concern interfaces with DSP (like UCX and UFX etc).
The Player settings (Play, Stop, Record etc.) only concern the UFX !

All OSC-Commands will only affect Tracks which are visible in Totalmix !! Invisible/hidden Tracks are ignored ! Consequently, changing the Tracks-Layout in Totalmix changes also the "Real Targets" for most of the OSC-Commands !

Feel free to use the attached Template-Session-File, which includes a Dashboard with with useful information.

# New Version V2.2

with a few more functions....
the session file "Totalmix-Template.noisette" has also been updated


# RME-Totalmix contrôle par OSC avec Chataigne
Les ports OSC doivent être correctement configurés dans Totalmix ; les valeurs par défaut sont Port (incoming) : 8000 et Port (outgoing) : 9000
et OSC dois être activés dans le menu "Option" de Totalmix ! Dans ce même Menu il y a les Sous-Menu Settings pour plus de réglages.
La valeur de "Bank" peut être définie pour n'importe quel nombre de faders (dans ce même sous-menu Settings et le Tab "OSC").

Totalmix permet de gérer presque toutes les cartes son RME ; c'est une console de mixage virtuelle full matricielle, ce qui rend la télécommande, notamment par OSC et Chataigne, assez complexe !!
La plupart des commandes ne sont pas absolues (-> ne s'adressent pas à un seul canal donné) mais elles sont "relatives". Cela signifie qu'une commande donnée concerne un canal donné (premier, deuxième, troisième etc) sur une couche donnée et envoyé vers un Submix/Bus donné... et tout cela est librement assignable !! C'est juste une "Affaire Matrix" complète !

Tous les paramètres d'égalisation, de compresseur et de gate etc n'affectent que le canal actuellement actif/sélectionné.
De plus, tous les réglages d'EQ, Compression, Gate mais aussi FX (Reverb et Delay) ne concernent que les interfaces avec DSP (comme les UCX et UFX etc).
Les paramètres du Player (Play, Stop, Record etc.) concernent uniquement l'UFX !

Toutes les commandes OSC n'affecteront que les pistes visibles dans Totalmix !! Les pistes invisibles/cachées sont ignorées ! Par conséquent, changer la disposition des pistes dans Totalmix change également les "cibles réelles" pour la plupart des commandes OSC !

N'hésitez pas à utiliser le fichier Totalmix-Template" ci-joint, qui inclue un tableau de bord (Dashboard) contenant des informations utiles.

# nouvelle version V2.2 

avec quelques fonctions en plus....
le fichier de session "Totalmix-Template.noisette" a été également mis à jour
