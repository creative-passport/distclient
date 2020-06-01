export const text_fields = {
  'passport_info': {'key': 0, 'label': 'PROFILE INFO', 'data_fields': {
    'aliases' : {'key': 0, 'label': 'ALIASES / AKA', 'type': 'typing_bubble'},
    'biography' : {'key': 1, 'label': 'BIOGRAPHY', 'type': 'long_text'},
    'sounds_like' : {'key': 2, 'label': ' SOUNDS LIKE', 'type': 'typing_bubble'},
    'genres' : {'key': 3, 'label': 'GENRES', 'type': 'multiple_bubble_list'},
    'music_roles' : {'key': 4, 'label': 'MUSIC ROLES', 'type': 'multiple_bubble_list'},
    'non_music_roles' : {'key': 5, 'label': 'NON-MUSIC ROLES', 'type': 'typing_bubble'},
    'other_skills' : {'key': 6, 'label': ' OTHER SKILLS', 'type': 'typing_bubble'},
    'instruments_played' : {'key': 7, 'label': 'INSTRUMENTS PLAYED', 'type': 'multiple_bubble_list'},
    'hardware_used': {'key': 8, 'label': 'HARDWARE USED', 'type': 'typing_bubble'},
    'software_used': {'key': 9, 'label': 'SOFTWARE USED' , 'type': 'typing_bubble'},
    'endorsement': {'key': 10, 'label': 'ENDORSEMENT', 'type': 'long_text'}, //TO CHANGE LATER TO multiple_single_entry_points
    'interests_inspiration': {'key': 11, 'label': 'INTERESTS / INSPIRATIONS', 'type': 'typing_bubble'},
    'current_projects': {'key': 12, 'label': 'CURRENT PROJECTS', 'type': 'long_text'}, //TO CHANGE LATER TO multiple_single_entry_points
    'favourite_music_makers': {'key': 13, 'label': 'FAVOURITE MUSIC MAKERS', 'type': 'typing_bubble'},
    'charities_supported': {'key': 14, 'label': 'CHARITIES SUPPORTED', 'type': 'typing_bubble'},
    'favourite_quote': {'key': 15, 'label': 'FAVOURITE QUOTE', 'type': 'long_text'}
    },
  },
  'ids': {'key': 1, 'label': 'IDs', 'data_fields': {
      'isni' : {'key': 0, 'label': 'ISNI', 'type': 'single_text'},
      'ipn' : {'key': 1, 'label': 'IPN', 'type': 'single_text'},
      'ipi' : {'key': 2, 'label': 'IPI', 'type': 'single_text'},
      'cp_id': {'key': 3, 'label': 'CP ID', 'type': 'single_text'},
      'other_proprietary_id': {'key': 4, 'label': 'OTHER PROPRIETARY ID', 'type': 'single_text'},
      'id_number' : {'key': 5, 'label': 'ID NUMBER', 'type': 'single_text'} 
    }
  },
  'representatives_contacts': {'key': 2, 'label': 'REPRESENTATIVES AND CONTACTS', 'data_fields': {
      'list_of_representatives': {'key': 0, 'label': 'Representatives', 'type': 'unique_list',
      'list_items': ['label', 'publisher', 'collection_society', 'distributor', 'pr_agency', 'agent', 'legal', 'sync_agency', 'management', 'general_contact']}}
  },
  'official_links': {'key': 3, 'label': 'OFFICIAL LINKS', 'data_fields': {
    'website' : {'key': 0, 'label': 'WEBSITE', 'type': 'single_text'},
    'merch' : {'key': 1, 'label': 'MERCH', 'type': 'single_text'},
    'facebook' : {'key': 2, 'label': 'FACEBOOK', 'type': 'single_text'},
    'instagram' : {'key': 3, 'label': 'TWITTER', 'type': 'single_text'},
    'tiktok' : {'key': 4, 'label': 'TIKTOK', 'type': 'single_text'},
    'snapchat' : {'key': 5, 'label': 'SNAPCHAT', 'type': 'single_text'},
    'youtube' : {'key': 6, 'label': 'YOUTUBE', 'type': 'single_text'},
    'spotify' : {'key': 7, 'label': 'SPOTIFY', 'type': 'single_text'},
    'apple_music' : {'key': 8, 'label': 'APPLE MUSIC', 'type': 'single_text'},
    'vevo' : {'key': 9, 'label': 'VEVO', 'type': 'single_text'},
    'twitch' : {'key': 10, 'label': 'TWITCH', 'type': 'single_text'},
    'bandcamp' : {'key': 11, 'label': 'BANDCAMP', 'type': 'single_text'},
    'songkick' : {'key': 12, 'label': 'SONGKICK', 'type': 'single_text'},
    'deezer' : {'key': 13, 'label': 'DEEZER', 'type': 'single_text'},
    'imvdb' : {'key': 14, 'label': 'IMVDB', 'type': 'single_text'},
    'genius' : {'key': 15, 'label': 'GENIUS', 'type': 'single_text'}
    }
  },
  'external_services': {'key': 4, 'label': 'EXTERNAL SERVICES', 'data_fields': {
      'youtube' : {'key': 0, 'label': 'youtube', 'type': 'single_text'},
    }
  },
  'music_services': {'key': 5, 'label': 'MUSIC SERVICES', 'data_fields': {}
  },
  'credits': {'key': 6, 'label': 'CREDITS', 'data_fields': {}
  },
  'performances': {'key': 7, 'label': 'PERFORMANCES', 'data_fields': {}
  },
  'other': {'key': 8, 'label': 'OTHER', 'data_fields': {}
  }
}

export const representative_fields = {
    'label': {'key': 0, 'label': 'LABEL', 'type': 'bubble_with_subfields', 'additional_info': {
      'email_address' : {'key': 0, 'label': 'EMAIL', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'Contact Person', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'Addiitional Info', 'type': 'single_text'}
    }},
    'publisher': {'key': 1, 'label': 'PUBLISHER', 'type': 'bubble_with_subfields', 'additional_info': {
      'name': {'key': 0, 'label': 'NAME', 'type': 'single_text'},
      'email_address' : {'key': 0, 'label': 'EMAIL', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'Contact Person', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'Addiitional Info', 'type': 'single_text'}
    }},
    'collection_society': {'key': 2, 'label': 'COLLECTION SOCIETY', 'type': 'typing_bubble'},
    'distributor': {'key': 3, 'label': 'DISTRIBUTOR', 'type': 'typing_bubble'},
    'pr_agency': {'key': 11, 'label': 'PR AGENCY', 'type': 'unique_list', 'additional_info': {
      'name': {'key': 0, 'label': 'NAME', 'type': 'single_text'},
      'email_address' : {'key': 0, 'label': 'EMAIL', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'Contact Person', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'Addiitional Info', 'type': 'single_text'}
    }},
    'agent': {'key': 4, 'label': 'AGENT', 'type': 'unique_list', 'additional_info': {
      'name': {'key': 0, 'label': 'NAME', 'type': 'single_text'},
      'email_address' : {'key': 0, 'label': 'EMAIL', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'Contact Person', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'Addiitional Info', 'type': 'single_text'}
    }},
    'legal': {'key': 5, 'label': 'LEGAL', 'type': 'unique_list', 'additional_info': {
      'name': {'key': 0, 'label': 'NAME', 'type': 'single_text'},
      'email_address' : {'key': 1, 'label': 'LEGALS', 'type': 'single_text'},
      'contact_person' : {'key': 2, 'label': 'LEGALS', 'type': 'single_text'},
      'additional_info' : {'key': 3, 'label': 'LEGALS', 'type': 'single_text'},
    }},
    'sync_agency': {'key': 6, 'label': 'SYNC AGENCY', 'type': 'unique_list', 'additional_info': {
      'name': {'key': 0, 'label': 'NAME', 'type': 'single_text'},
      'email_address' : {'key': 1, 'label': 'SYNC AGENCY', 'type': 'single_text'},
      'contact_person' : {'key': 2, 'label': 'SYNC AGENCY', 'type': 'single_text'},
      'additional_info' : {'key': 3, 'label': 'SYNC AGENCY', 'type': 'single_text'},
    }},
    'management': {'key': 7, 'label': 'MANAGEMENT', 'type': 'unique_list', 'additional_info': {
      'name': {'key': 0, 'label': 'NAME', 'type': 'single_text'},
      'email_address' : {'key': 1, 'label': 'MANAGEMENT', 'type': 'single_text'},
      'contact_person' : {'key': 2, 'label': 'MANAGEMENT', 'type': 'single_text'},
      'additional_info' : {'key': 3, 'label': 'MANAGEMENT', 'type': 'single_text'},
    }},
    'general_contact' : {'key': 8, 'label': 'GENERAL CONTACT', 'type': 'single_text'}
}  

export const avs = {
  'genres': {
    'name':'genres',
    'values': ['acid house', 'acid jazz', 'acid rock', 'acid techno', 'acoustic blues', 'acoustic rock', 'afoxê', 'afrobeat', 'alternative country', 'alternative dance', 'alternative folk', 'alternative hip hop', 'alternative metal', 'alternative pop', 'alternative punk', 'alternative rock', 'ambient dub', 'ambient house', 'ambient techno', 'ambient', 'americana', 'anarcho-punk', 'aor', 'arena rock', 'art pop', 'art rock', 'atmospheric black metal', 'audiobook', 'avant-garde jazz', 'avant-garde metal', 'avant-garde pop', 'avant-garde', 'avant-prog', 'bachata', 'ballad', 'barbershop', 'baroque', 'bebop', 'bhangra', 'big band', 'big beat',
               'black metal', 'blackened death metal', 'blackgaze', 'blue-eyed soul', 'bluegrass', 'blues rock', 'blues', 'bolero son', 'bolero', 'bongo flava', 'boogie rock', 'boogie-woogie', 'boom bap', 'bossa nova', 'bounce', 'breakbeat hardcore', 'breakbeat', 'breakcore', 'breaks', 'britpop', 'broken beat', 'brutal death metal', 'bubblegum pop', 'cajun', 'calypso', 'candombe', 'canterbury scene', 'cantopop', 'celtic punk', 'celtic', 'chamber pop', 'champeta', 'changüí', 'chanson', 'chicago blues', 'chillout', 'chiptune', 'christian rock', 'christmas music', 'chutney', 'city pop', 'classic blues', 'classic country', 'classic jazz', 'classic rock', 'classical crossover', 'classical', 'club', 'comedy rock',
               'comedy', 'compas', 'conscious hip hop', 'contemporary christian', 'contemporary classical', 'contemporary folk', 'contemporary gospel', 'contemporary jazz', 'contemporary r&b', 'contra', 'cool jazz', 'country blues', 'country folk', 'country pop', 'country rock', 'country', 'coupé-décalé', 'cowpunk', 'crossover prog', 'crust punk', 'cumbia villera', 'cumbia', 'cyberpunk', 'd-beat', 'dance-pop', 'dance-punk', 'dance', 'dancehall', 'dark ambient', 'dark electro', 'dark folk', 'dark wave', 'death metal', 'death-doom metal', 'deathcore', 'deathgrind', 'deathrock', 'deep house', 'delta blues', 'descarga', 'desert rock', 'detroit techno', 'digital hardcore', 'disco', 'doo-wop', 'doom metal', 'downtempo', 'dream pop',
               'drill and bass', 'drill', 'drone', 'drum and bass', 'dub techno', 'dub', 'dubstep', 'dungeon synth', 'east coast hip hop', 'ebm', 'edm', 'electric blues', 'electro house', 'electro swing', 'electro-funk', 'electro-industrial', 'electro', 'electroclash', 'electronic rock', 'electronic', 'electronica', 'electronicore', 'electropop', 'electropunk', 'emo', 'emocore', 'enka', 'ethereal', 'euro house', 'eurodance', 'europop', 'experimental rock', 'experimental', 'fado', 'filk', 'flamenco', 'folk metal', 'folk pop', 'folk punk', 'folk rock', 'folk', 'freak folk', 'free improvisation', 'free jazz', 'funk carioca', 'funk metal', 'funk rock', 'funk soul', 'funk', 'funky house', 'fusion', 'future garage', 'future jazz',
               'futurepop', 'g-funk', 'gabber', 'gangsta rap', 'garage house', 'garage punk', 'garage rock', 'garage', 'glam metal', 'glam rock', 'glam', 'glitch', 'goa trance', 'goregrind', 'gospel', 'gothic metal', 'gothic rock', 'gothic', 'grebo', 'grime', 'grindcore', 'groove metal', 'group sounds', 'grunge', 'guaguancó', 'guajira', 'guaracha', 'happy hardcore', 'hard bop', 'hard house', 'hard rock', 'hard trance', 'hardcore hip hop', 'hardcore punk', 'hardcore techno', 'hardstyle', 'harsh noise wall', 'harsh noise', 'hauntology', 'heavy metal', 'heavy psych', 'heavy rock', 'hi-nrg', 'hip hop', 'hip house', 'honky tonk', 'horror punk',
               'horrorcore', 'house', 'idm', 'illbient', 'indie folk', 'indie pop', 'indie rock', 'indie', 'indietronica', 'indorock', 'industrial metal', 'industrial musical', 'industrial rock', 'industrial techno', 'industrial', 'instrumental jazz', 'instrumental rock', 'instrumental', 'irish folk', 'italo-disco', 'j-pop', 'j-rock', 'jazz blues', 'jazz fusion', 'jazz rap', 'jazz rock',
               'jazz-funk', 'jazz', 'joik', 'jungle', 'k-pop', 'kawaii metal', 'kayōkyoku', 'kizomba', 'klezmer', 'krautrock', 'latin jazz', 'latin pop', 'latin rock', 'latin', 'leftfield', 'line dance', 'lo-fi', 'lounge', 'lovers rock', 'madchester', 'mainstream rock', 'maloya', 'mambo', 'mandopop', 'martial industrial', 'maskanda', 'math rock', 'mathcore', 'medieval', 'melodic black metal', 'melodic death metal', 'melodic metalcore', 'melodic rock', 'melodic trance', 'mento', 'merengue', 'metal', 'metalcore', 'miami bass', 'microhouse', 'milonga', 'minyō', 'mincecore', 'minimal techno', 'minimal wave', 'minimal', 'modern blues', 'modern classical', 'modern country', 'motown', 'mpb', 'musical', 'neo soul', 'neo-progressive rock',
               'neo-rockabilly', 'neo-traditional country', 'neofolk', 'nerdcore', 'new age', 'new jack swing', 'new romantic', 'new wave', 'nightcore', 'no wave', 'noise pop', 'noise rock', 'noise', 'noisecore', 'non-music', 'norteño', 'northern soul', 'nu jazz', 'nu metal', 'nueva canción', 'occult rock', 'oi', 'old school death metal', 'old-time', 'opera', 'orchestral', 'outlaw country', 'p-funk', 'pachanga', 'polka', 'pop metal', 'pop punk', 'pop rap', 'pop rock', 'pop soul', 'pop', 'pornogrind', 'post-bop', 'post-classical', 'post-grunge', 'post-hardcore', 'post-metal', 'post-punk', 'post-rock', 'power electronics', 'power metal', 'power pop', 'powerviolence', 'production music', 'progressive folk',
               'progressive house', 'progressive metal', 'progressive rock', 'progressive trance', 'progressive', 'psy-trance', 'psychedelic folk', 'psychedelic pop', 'psychedelic rock', 'psychedelic', 'psychobilly', 'psytrance', 'punk rock', 'punk', 'queercore', 'r&b', 'ragga hip-hop', 'ragga jungle', 'ragga', 'ragtime',
               'raï', 'ranchera', 'rap rock', 'rapcore', 'rave', 'red song', 'reggae', 'reggaeton', 'rhythmic noise', 'ritual ambient', 'rock and roll', 'rock', 'rockabilly', 'rocksteady', 'romantic classical', 'roots reggae', 'rumba', 'ryūkōka', 'salsa', 'samba', 'schlager', 'screamo', 'shibuya-kei', 'shoegaze', 'singer-songwriter', 'ska punk', 'ska', 'skacore', 'slow waltz', 'sludge metal', 'smooth jazz', 'smooth soul', 'soca', 'soft rock', 'son cubano', 'son montuno', 'soul jazz', 'soul', 'southern rock', 'southern soul', 'space rock', 'speed garage', 'speed metal', 'spoken word', 'steampunk', 'stoner metal', 'stoner rock', 'street punk', 'surf rock', 'swamp pop', 'swamp rock', 'swing', 'symphonic black metal', 'symphonic metal',
               'symphonic prog', 'symphonic rock', 'symphony', 'synth-pop', 'synthwave', 'tango', 'tech house', 'technical death metal', 'techno', 'teen pop', 'thrash metal', 'thrashcore', 'timba', 'traditional country', 'trance', 'trap edm', 'trap', 'tribal ambient', 'tribal house', 'trip hop', 'turntablism', 'uk drill', 'uk funky', 'uk garage', 'underground hip hop', 'vallenato', 'vaporwave', 'viking metal', 'visual kei', 'vocal house', 'vocal jazz', 'vocal trance', 'waltz', 'west coast hip hop', 'west coast swing', 'western swing', 'yacht rock', 'yé-yé', 'zamrock', 'zeuhl', 'zouk', 'zydeco']  },
  'music_roles': {
    'name': 'music_roles',
    'values': ['Artist', 'Artist Vocal Second Engineer', 'Assistant Engineer', 'Assistant Producer', 'Associated Performer', 'Associate Producer', 'Aural Trainer', 'Background Vocalist', 'Balance Engineer', 'Band Leader', 'Chief Lighting Technician', 'Choir', 'Choir Member', 'Chorus Master', 'Circus Artist', 'Club DJ',
               'Co-Executive Producer', 'Co-Mixer', 'Co-Mixing Engineer', 'Concert Master', 'Conductor', 'Co-Producer', 'Digital Audio Workstation Engineer', 'Digital Editing Engineer', 'Digital Editing Second Engineer', 'Direct Stream Digital Engineer', 'DJ', 'Dubber', 'Engineer', 'Executive Producer', 'Featured Artist', 'Film Sound Engineer', 'Foley Artist', 'Foley Editor', 'Foley Mixer', 'Grip', 'Group Member', 'Key Grip',
               'Lead Performer', 'Lighting Director', 'Lighting Technician', 'Main Artist', 'Mastering Engineer', 'Mastering Second Engineer', 'Mixer', 'Mixing Engineer', 'Mixing Second Engineer', 'Music Arranger', 'Music Copyist', 'Music Director', 'Music Group', 'Musician', 'Narrator', 'Orchestra', 'Orchestra Member',
               'Original Artist', 'Overdub Engineer', 'Overdub Second Engineer', 'Performer', 'Playback Singer', 'Post Producer', 'Pre-Production', 'Pre-Production Engineer', 'Pre-Production Second Engineer', 'Primary Musician', 'Programmer', 'Programming Engineer', 'Program Producer', 'Project Engineer', 'Recording Engineer', 'Recording Second Engineer', 'Remixed Artist', 'Remixer', 'Remixing Engineer', 'Remixing Second Engineer',
               'Rigger', 'Runner', 'Soloist', 'Sound Designer', 'Sound Mixer', 'Sound Recordist', 'Sound Supervisor', 'Speaker', 'Stage Assistant Engineer', 'Stage Engineer', 'String Engineer', 'String Producer', 'Strings Director', 'Studio Conductor', 'Studio Musician', 'Studio Personnel', 'Studio Producer',
               'Surround Mixing Engineer', 'Surround Mixing Second Engineer', 'Tape Operator', 'Technical Director', 'Tonmeister', 'Tracking Engineer', 'Tracking Second Engineer', 'Transfers And Safeties Engineer', 'Transfers And Safeties Second Engineer', 'Vocal Arranger', 'Vocal Editing Engineer', 'Vocal Editing Second Engineer', 'Vocal Engineer', 'Vocalist', 'Vocal Producer', 'Vocal Second Engineer', 'Voice Actor', ]},
  'non_music_roles': {
    'name':'non_music_roles',
    'values': [ 'Manager', 'Producer']
  },
  'instruments_played': {
    'name':'instruments_played',
    'values': [ '12-String Electric Guitar', '12-String Guitar', '5-String Banjo', 'Accordion', 'Acoustic Bass Guitar', 'Acoustic Guitar', 'Acoustic Keyboard',
                'African Harp', 'African Percussion', 'Agogo Bells', 'Alboka', 'Alpenhorn', 'Alto Clarinet', 'Alto Crumhorn', 'Alto Flute', 'Alto Horn', 'Alto Recorder', 'Alto Sackbut', 'Alto Saxophone', 'Alto Shawm', 'Alto Trombone', 'Alto Viol', 'Andean Harp', 'Angklung', 'Animal Sounds', 'Anvil', 'Apito', 'Applause', 'Arch Lute', 'Arghul', 'Arpeggiating Synth', 'Atumpan', 'Aulochrome', 'Autoharp', 'Baby Bass', 'Baglama', 'Bagpipes', 'Bahian Guitar', 'Bajo Sexto', 'Balafon', 'Balalaika', 'Bandoneon', 'Bandura', 'Bandurria', 'Banhu', 'Banjo', 'Banjo Guitar', 'Banjolin', 'Bansuri', 'Baritone Guitar', 'Baritone Horn', 'Baritone Oboe',
                'Baritone Saxophone', 'Baroque Bassoon', 'Baroque Cello', 'Baroque Clarinet', 'Baroque Flute', 'Baroque Guitar', 'Baroque Oboe', 'Baroque Recorder', 'Baroque Viola', 'Baroque Violin', 'Barrel Organ', 'Baryton', 'Bass', 'Bass Banjo', 'Bass Cittern', 'Bass Clarinet', 'Bass Drum (Concert)', 'Bass Drum (Kick)', 'Bass Dulcian', 'Basset Clarinet', 'Basset Horn', 'Bass Flute', 'Bass Harmonica', 'Basso Da Braccio', 'Bassoon', 'Bass Rebec', 'Bass Recorder', 'Bass Sackbut', 'Bass Saxophone', 'Bass Shawm', 'Bass Trombone', 'Bass Trumpet', 'Bass Tuba', 'Bass Viol', 'Bata', 'Bawu', 'Bell Tree', 'Bendir', 'Berimbau', 'Bicycle Pump', 'Binghi Drum', 'Bird Song', 'Bird Whistle', 'Biwa', 'Bodhran', 'Body Percussion', 'Bombard', 'Bombo', 'Bombo Leguero', 'Bones', 'Bongos', 'Bosuns Whistle', 'Bottles', 'Bouzouki', 'Bowed Strings', 'Boy Voice', 'Bozoq', 'Brass Instrument', 'Brazilian Percussion', 'Breakbeat', 'Bufo Bass', 'Bugle', 'Cabasa', 'Caixa', 'Caja', 'Cajon', 'Calabash', 'Calliope', 'Carillon', 'Car Sounds', 'Castanet', 'Cavaquinho', 'Caxixi', 'Celesta', 'Cello', 'Cello Banjo', 'Celtic Harp', 'Chalumeau', 'Chamberlin', 'Chapman Stick', 'Charango', 'Chatter', 'Chewing Sounds', 'Childrens Background Vocalist', 'Child Voice', 'Chimes', 'Chocalho', 'Choir', 'Chromatic Button Accordion', 'Chromatic Harmonica', 'Church Bells', 'Cimbalom', 'Cimbasso', 'Citole', 'Cittern', 'Clapstick', 'Clarinet', 'Clarino Trumpet', 'Claves', 'Clavichord', 'Clavinet', 'Claypot', 'Comb', 'Concert Harp', 'Concertina', 'Conch Shell', 'Congas', 'Contra Alto Clarinet', 'Contrabass Clarinet', 'Contrabassoon', 'Contrabass Recorder', 'Contrabass Sarrusophone', 'Contrabass Saxophone', 'Contrabass Trombone', 'Cordovox',
                'Cornet', 'Cornetto', 'Cowbell', 'Craviola', 'Crotales', 'Crumhorn', 'Crwth', 'Cuatro', 'Cuica', 'Cumbus', 'Cymbal(Crash)', 'Cymbal(Ride)', 'Cymbal(Suspended)', 'Cymbals', 'Daegeum', 'Daf', 'Damaru', 'DanBau', 'DanTranh', 'Davul', 'Dayereh', 'Defi', 'Dhol', 'Dholak', 'Dictophone', 'Didgeridoo', 'Dilruba', 'Diple', 'Dizi', 'Djembe', 'Dobro Guitar', 'Dohol', 'Dombra', 'Domra', 'Double Bass', 'Doublebass Viol', 'Double Harp', 'Double Violin', 'Doumbek', 'Dranyen', 'Drum Kit', 'Drum Machine', 'Drum Sample', 'Drum Sticks', 'Duduk', 'Duggi', 'Dulcian', 'Dulcitone', 'Dungchen', 'Dunun', 'Dutar', 'Dzuddahord', 'Ektara', 'Electric 6String Violin', 'Electric Bass Guitar', 'Electric Cello', 'Electric Guitar', 'Electric Harp', 'Electric Mandolin', 'Electric Organ', 'Electric Piano', 'Electric Sitar', 'Electric Viola', 'Electric Violin', 'Electro Acoustic Hurdy Gurdy', 'Elephant Bell', 'English Horn', 'Ennanga', 'Epinette Des Vosges', 'Erhu', 'Esraj', 'Euphonium', 'Female Background Vocalist', 'Female Voice', 'Fiddle', 'Fife', 'Finger Clicks', 'Finger Cymbals', 'Finger Snaps', 'Fiscorn', 'Flabiol', 'Flageolet', 'Flexatone', 'Floyera', 'Flugelhorn', 'Flute', 'Folk Harp', 'Folkloric Percussion', 'Foot Stomp', 'Fortepiano', 'French Horn', 'Fretless Bass Guitar', 'Frog', 'Frying Pan Guitar', 'Fujara', 'Gadulka', 'Gambang', 'Gamelan', 'Ganga', 'Gardon', 'Gasba', 'Gayageum', 'Gemshorn', 'German Flute', 'Ghaita', 'Ghaychak', 'Girl Voice', 'Gittern', 'Gizmo', 'Glass Harmonica', 'Glass Harp', 'Glockenspiel', 'Gong', 'Grand Piano', 'Great Bass Recorder', 'Group Background Vocalists', 'Guacharaca', 'Guache', 'Guanzi', 'Guira', 'Guiro', 'Guitar', 'Guitarron', 'Gunshots', 'Guqin', 'Gusli', 'Guzheng',
                'Gyaling', 'Haegeum', 'Hammered Dulcimer', 'Hammered Strings', 'Hammond Organ', 'Hand Bells', 'Hand Chimes', 'Hand Claps', 'Hardanger Fiddle', 'Harmonica', 'Harp', 'Harpsichord', 'Heckelphone', 'Helicon', 'Herald Trumpet', 'Highland Pipes', 'HiHat Cymbal', 'Hohner Guitaret', 'Hot Fountain Pen', 'Huapanguera', 'Hurdy Gurdy', 'Irish Bouzouki', 'Irish Low Whistle', 'Jagdhorn', 'Jakhay', 'Jam Block', 'Jarana Jarocha', 'Jawbone', 'Jawharp', 'JewsHarp', 'Jinghu', 'Jug', 'Kacapi', 'Kalimba', 'Kanjira', 'Kantele', 'Kanun', 'Katsa', 'Kaval', 'Kazoo', 'Kemenche', 'Kendang', 'Keyboard', 'Keyed Trumpet', 'Khamak', 'Khartal', 'Khene', 'Khim', 'Khlui', 'Khol', 'Khong Wong Lek', 'Khong Wong Yai', 'Knuckles', 'Kora', 'Koto', 'Kugo', 'Langeleik', 'Laouto', 'Lap Steel Guitar', 'Latin Percussion', 'Launeddas', 'Lead Vocalist', 'Leona', 'Lirone', 'Lithophone', 'Lokole', 'Lowrey Organ', 'Lur', 'Lute', 'Lutheal', 'Lyra Viol', 'Lyre', 'Madal', 'Magnetic Tape Treatments', 'Male Background Vocalist', 'Male Voice', 'Mandocello', 'Mandola', 'Mandolele', 'Mandolin', 'Mandolino', 'Mandore', 'Maracas', 'Marimba', 'Marimbaphone', 'Marimbula', 'Marxophone', 'Mazhar', 'Medieval Fiddle', 'Medieval Harp', 'Mellophone', 'Mellotron', 'Melodeon', 'Melodica', 'Metal Cans', 'Mijwiz', 'Miniature Khene', 'Mixed Background Vocalist', 'Mixed Voice', 'Mizmar', 'Mohan Veena', 'Mouth Organ', 'Mouth Percussion', 'Mridangam', 'Muharsing', 'Musette', 'Musical Bow', 'Music Box', 'Naal', 'Nadaswaram', 'Nagara', 'Nai', 'Native American Flute', 'Natural Horn', 'Natural Trumpet', 'Neutral Voice', 'Ney Flute', 'Ngoni', 'Njarka', 'Nyatiti', 'Nyckelharpa', 'Nylon String Guitar', 'Oboe', 'Oboe Da Caccia', 'Oboe DAmore', 'Oborom Drum',
                'Ocarina', 'Octoban', 'Omnichord', 'Ophicleide', 'Optigan', 'Orchestral Hit', 'Orchestral Percussion', 'Organ', 'Organistrum', 'Orpharion', 'Oud', 'Paddle Drums', 'Paixiao', 'Pandeiro', 'Pandura', 'Pan Flute', 'Paraguayan Harp', 'Pedabro', 'Pedal Steel Guitar', 'Percussion Instrument', 'Percussion Section', 'Phin', 'Phonofiddle', 'Pi', 'Pianet', 'Piano', 'Piano Accordion', 'Piano Harp', 'Pianola', 'Piccolo Bass', 'Piccolo Clarinet', 'Piccolo Flute', 'Piccolo Trumpet', 'Pinkillu', 'Pipa', 'Pipe Organ', 'Pitched Percussion Instrument', 'Plucked Dulcimer', 'Plucked Strings', 'Pocket Trumpet', 'Police Whistle', 'PongLang', 'Portuguese Guitar', 'Positive Organ', 'Post Horn', 'Pots And Pans', 'Prepared Piano', 'Psaltery', 'Pump Organ', 'Pungi', 'Qarkabeb', 'Quena', 'Quenacho', 'Rabel', 'Rackett', 'Rainstick', 'Ranat', 'Ratchet', 'Rattle', 'Rauschpfeife', 'Rebab', 'Rebec', 'Recorder', 'Record Noise', 'Reco Reco', 'Reed Instrument', 'Regal', 'Renaissance Guitar', 'Repinique', 'Rhodes', 'RhythmStick', 'Riq', 'Rnga', 'Rolmo', 'Romantic Guitar', 'Rondador', 'Rototoms', 'Sabar', 'Sackbut', 'Sampled Keyboard', 'Sand Blocks', 'Santoor', 'Sarangi', 'Sarod', 'Sarrusophone', 'Saung', 'Saw', 'Saw Duang', 'Saxophone', 'Scratcher', 'Serpent', 'Shaker', 'Shakuhachi', 'Shamisen', 'Shawm', 'Shekere', 'Shelltone', 'Shenai', 'Sheng', 'Sho', 'Shofar', 'Shruti Box', 'Shvi Whistle', 'Siku', 'Simsimiyya', 'Singing Bowls', 'Sintir', 'Siren', 'Sistrum', 'Sitar', 'Slapstick', 'Sleigh Bells', 'Slide Saxophone', 'Slide Trumpet', 'Slide Whistle', 'Snare Drum', 'Snare Drum(Marching)', 'Sopranino Recorder', 'Sopranino Saxophone', 'Soprano Clarinet', 'Soprano Cornet', 'Soprano Crumhorn', 'Soprano Domra', 'Soprano Dulcian',
                'Soprano Recorder', 'Soprano Saxophone', 'Soprano Shawm', 'Soprano Trumpet', 'Sordun', 'Sound Design', 'Sound Effects', 'Sousaphone', 'Spectrasonics Omnisphere', 'Spinet', 'Spoons', 'Spring Drum', 'Square Piano', 'Steel Drums', 'Sticks', 'String Instrument', 'String Section', 'Strohl Violin', 'Suling', 'Suona', 'Surbahar', 'Surdo', 'Swarmandal', 'Synth Bass', 'Synth Brass', 'Synth Choir', 'Synthesizer', 'SynthFX', 'Synth Lead', 'Synth Pad', 'Synth Steel Drums', 'Synth Strings', 'Taal', 'Taarija', 'Tabla', 'Tabor', 'Tack Piano', 'Taiko', 'Talking Drum', 'Tambora', 'Tamborim', 'Tambourine', 'Tambura', 'Tanbour', 'Tanpura', 'Taonga Puoro', 'Tar(Percussion)', 'Tar(String)', 'Tarka', 'Tarogato', 'Tarol', 'Temple Bell', 'Temple Blocks', 'Tenor Banjo', 'Tenor Crumhorn', 'Tenor Drum', 'Tenor Dulcian', 'Tenor Flute', 'Tenor Guitar', 'Tenor Rebec', 'Tenor Recorder', 'Tenor Sackbut', 'Tenor Saxophone', 'Tenor Shawm', 'Tenor Trombone', 'Tenor Viol', 'Thavil', 'Theorbo', 'Thunder Sheet', 'Tibetan Bells', 'Timbales', 'Timbau', 'Timpani', 'Timple', 'Tingsha', 'Tin Whistle', 'Tiple', 'Togaman Guitar Viol', 'Tompak', 'Toms', 'Tongue Drum', 'Touch Guitar', 'Toy Accordion', 'Toy Piano', 'Train Sounds', 'Treatments', 'Treble Rebec', 'Treble Viol', 'Tres', 'Triangle', 'Tromba Marina', 'Trombone', 'Trumpet', 'Tuba', 'Tumbi', 'Turntable', 'Tusselfloyte', 'Txalaparta', 'Tzouras', 'Udu', 'Uillean Pipes', 'Ukulele', 'Uli Uli', 'Unintended Artifacts', 'Unpitched Percussion Instrument', 'Upright Bass', 'Upright Piano', 'Urumee', 'Vako Orchestron', 'Valiha', 'Valve Trombone', 'Veena', 'Venezuelan Harp', 'Veracruz Harp', 'Vibraphone', 'Vibraslap', 'Vichitra Veena', 'Vielle', 'Vihuela', 'Viol', 'Viola', 'Viola Caipira',
                'Viola DAmore', 'Viola Pomposa', 'Violin', 'Violino Piccolo', 'Virginals', 'ViTar', 'Vuvuzela', 'Wagner Tuba', 'Washboard', 'Washtub Bass', 'Waterphone', 'Welsh Triple Harp', 'Willow Flute', 'Wind Chimes', 'Wind Instrument', 'Wind Machine', 'Wind Section', 'Wire Strung Harp', 'Wobble Board', 'Wood Block', 'Wood Flute', 'Wood Trumpet', 'Wot', 'Xalam', 'Xaphoon', 'Xiao', 'Xun', 'Xylophone', 'Xylorimba', 'Yangqin', 'Yayli Tambur', 'Yokin', 'Yueqin', 'Zerbaghali', 'Zeze', 'Zhonghu', 'Zither', 'Zummara', 'Zurna', 'Zydeco Rubboard']},
  'pr_agency': {
    'name':'pr_agency', 'values': []
  }
}


