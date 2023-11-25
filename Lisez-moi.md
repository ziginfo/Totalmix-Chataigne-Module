## RME-Totalmix contrôle par OSC avec Chataigne   
Totalmix doit être lancé sur l'Ordinateur !!   
Les ports OSC doivent être correctement configurés dans Totalmix ; les valeurs par défaut sont Port (incoming) : 8000 et Port (outgoing) : 9000  
et OSC dois être activés dans le menu "Option" de Totalmix ! Dans ce même Menu il y a les Sous-Menu Settings pour plus de réglages.  
La valeur du « Nombre de Faders par Banque » peut être modifiée dans le Menu "Options/Settings/OSC" si vous le souhaitez. La valeur par défaut est 8 (peut être définie sur 12, 16, 20, etc.).  

Totalmix permet de gérer presque toutes les cartes son RME ; c'est une console de mixage virtuelle full matricielle, ce qui rend la télécommande, notamment par OSC et Chataigne, assez complexe !!  
La plupart des commandes ne sont pas absolues (-> ne s'adressent pas à un seul canal donné) mais elles sont "relatives". Cela signifie qu'une commande donnée concerne un canal donné (premier, deuxième, troisième etc) sur une couche donnée et envoyé vers un Submix/Bus donné... et tout cela est librement assignable !! C'est juste une "Affaire Matrix" complète !

Tous les paramètres d'égalisation, de compresseur et de gate etc n'affectent que le canal actuellement actif/sélectionné.  
De plus, tous les réglages d'EQ, Compression, Gate mais aussi FX (Reverb et Delay) ne concernent que les interfaces avec DSP (comme les UCX et UFX etc).  
Les paramètres du Player (Play, Stop, Record etc.) concernent uniquement l'UFX !

Toutes les commandes OSC n'affecteront que les pistes visibles dans Totalmix !! Les pistes invisibles/cachées sont ignorées ! Par conséquent, changer la disposition des pistes dans Totalmix change également les "cibles réelles" pour la plupart des commandes OSC !

N'hésitez pas à utiliser le fichier Totalmix-Template" ci-joint, qui inclue un tableau de bord (Dashboard) contenant des informations utiles.

#### ::  Nouvelle Version V2.4
Avec quelques fonctions supplémentaires....  

**Le fichier de session "Totalmix-Template.noisette" a aussi été mis à jour**
