export const text_fields = 
{
  'passport_info': {'key': 0, 'label': 'PASSPORT INFO', 'data_fields': {
    'aliases' : {'key': 0, 'label': 'ALIASES / AKA', 'type': 'bubble'},
    'biography' : {'key': 1, 'label': 'BIOGRAPHY', 'type': 'long_text'},
    'sounds_like' : {'key': 2, 'label': ' SOUNDS LIKE', 'type': 'bubble'},
    'genre' : {'key': 3, 'label': 'GENRE', 'type': 'bubble'},
    'music_roles' : {'key': 4, 'label': 'MUSIC ROLES', 'type': 'bubble'},
    'non_music_roles' : {'key': 5, 'label': 'NON-MUSIC ROLES', 'type': 'unique_list', 
      'additional_info' : {'key': 0, 'label': 'NON-MUSIC ROLES company', 'type': 'single_text'}},
    'other_skills' : {'key': 6, 'label': ' OTHER SKILLS', 'type': 'bubble'},
    'instruments_played' : {'key': 7, 'label': 'INSTRUMENTS PLAYED', 'type': 'multiple_list', 'additional_info': {
      'company': {'key': 0, 'label': 'company', 'type': 'single_text'},
      'manufacturer' : {'key': 1, 'label': 'INSTRUMENTS PLAYED', 'type': 'single_text'}
    }},
    'hardware_used': {'key': 8, 'label': 'HARDWARE USED', 'type': 'typing_bubble'},
    'software_used': {'key': 9, 'label': 'SOFTWARE USED' , 'type': 'typing_bubble', 'additional_info': {
      'company': {'key': 0, 'label': 'company', 'type': 'single_text'}
    }},
    'endorsement': {'key': 10, 'label': 'ENDORSEMENT', 'type': 'multiple_list'},
    'interests_inspiration': {'key': 11, 'label': 'INTERESTS / INSPIRATION', 'type': 'typing_bubble'},
    'current_projects': {'key': 12, 'label': 'CURRENT PROJECTS', 'type': 'multiple_single_entry_points'},
    'favourite_music_makers': {'key': 13, 'label': 'FAVOURITE MUSIC MAKERS', 'type': 'typing_bubble'},
    'charities_supported': {'key': 14, 'label': 'CHARITIES SUPPORTED', 'type': 'typing_bubble'},
    'favourite_quote': {'key': 15, 'label': 'FAVOURITE QUOTE', 'type': 'long_text'}
    },
  },
  'metadata': {'key': 1, 'label': 'METADATA', 'data_fields': {
    'aliases' : {'key': 0, 'label': 'ALIASES / AKA', 'type': 'long_text'}
    }
  },
  'representatives': {'key': 2, 'label': 'IDs & REPRESENTATIVES', 'data_fields': {
      'isni' : {'key': 0, 'label': 'ISNI', 'type': 'single_text'},
      'ipn' : {'key': 1, 'label': 'IPN', 'type': 'single_text'},
      'ipi' : {'key': 2, 'label': 'IPI', 'type': 'single_text'},
      'cp_id': {'key': 3, 'label': 'CP ID', 'type': 'single_text'},
      'other_proprietary_id': {'key': 4, 'label': 'OTHER PROPRIETARY ID', 'type': 'single_text'},
      'system' : {'key': 5, 'label': 'SYSTEM', 'type': 'single_text'},
      'id_number' : {'key': 6, 'label': 'ID NUMBER', 'type': 'single_text'},
      'label': {'key': 7, 'label': 'LABELS', 'type': 'typing_bubble', 'additional_info': {
        'email_address' : {'key': 0, 'label': 'EMAIL', 'type': 'single_text'},
        'contact_person' : {'key': 1, 'label': 'Contact Person', 'type': 'single_text'},
        'additional_info' : {'key': 2, 'label': 'Addiitional Info', 'type': 'single_text'}
      }
    },
    'publisher': {'key': 8, 'label': 'PUBLISHER', 'type': 'unique_list', 'additional_info': {
      'email_address' : {'key': 0, 'label': 'PUBLISHER', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'PUBLISHER', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'PUBLISHER', 'type': 'single_text'}
      }
    },
    'collection_societies': {'key': 9, 'label': 'COLLECTION SOCIETIES', 'type': 'unique_list'},
    'distributors': {'key': 10, 'label': 'DISTRIBUTORS', 'type': 'unique_list'},
    'pr_agency': {'key': 11, 'label': 'PR AGENCY', 'type': 'unique_list', 'additional_info': {
        'email_address' : {'key': 0, 'label': 'PR AGENCY', 'type': 'single_text'},
        'contact_person' : {'key': 1, 'label': 'PR AGENCY', 'type': 'single_text'},
        'additional_info' : {'key': 2, 'label': 'PR AGENCY', 'type': 'single_text'},
    }},
    'agent': {'key': 12, 'label': 'AGENT', 'type': 'unique_list', 'additional_info': {
      'email_address' : {'key': 0, 'label': 'AGENT', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'AGENT', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'AGENT', 'type': 'single_text'},
    }},
    'legal': {'key': 13, 'label': 'LEGALS', 'type': 'unique_list', 'additional_info': {
      'email_address' : {'key': 0, 'label': 'LEGALS', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'LEGALS', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'LEGALS', 'type': 'single_text'},
    }},
    'sync_agency': {'key': 14, 'label': 'SYNC AGENCY', 'type': 'unique_list', 'additional_info': {
      'email_address' : {'key': 0, 'label': 'SYNC AGENCY', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'SYNC AGENCY', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'SYNC AGENCY', 'type': 'single_text'},
    }},
    'management': {'key': 15, 'label': 'MANAGEMENT', 'type': 'unique_list', 'additional_info': {
      'email_address' : {'key': 0, 'label': 'MANAGEMENT', 'type': 'single_text'},
      'contact_person' : {'key': 1, 'label': 'MANAGEMENT', 'type': 'single_text'},
      'additional_info' : {'key': 2, 'label': 'MANAGEMENT', 'type': 'single_text'},
    }},
    'general_contact' : {'key': 16, 'label': 'GENERAL CONTACT', 'type': 'single_text'}
    }
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
      'apple_music' : {'key': 0, 'label': 'APPLE MUSIC', 'type': 'single_text'},
      'vevo' : {'key': 1, 'label': 'VEVO', 'type': 'single_text'},
      'twitch' : {'key': 2, 'label': 'TWITCH', 'type': 'single_text'},
      'bandcamp' : {'key': 3, 'label': 'BANDCAMP', 'type': 'single_text'},
      'songkick' : {'key': 4, 'label': 'SONGKICK', 'type': 'single_text'},
      'deezer' : {'key': 5, 'label': 'DEEZER', 'type': 'single_text'},
      'imvdb' : {'key': 6, 'label': 'IMVDB', 'type': 'single_text'},
      'genius' : {'key': 7, 'label': 'GENIUS', 'type': 'single_text'}
    }
  },
  'team': {'key': 4, 'label': 'TEAM / BOOKING / LICENSING', 'data_fields': {}
    },
  'other': {'key': 5, 'label': 'OTHER', 'data_fields': {}
    },
  'external_data': {'key': 6, 'label': 'EXTERNAL DATA', 'data_fields': {}
    }
}
