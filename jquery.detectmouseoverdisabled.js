/*!
    DetectMouseOverDisabled - A jQuery plugin
    ==================================================================
    ©2010 JasonLau.biz - Version 1.0.5
    ==================================================================
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){
  $.fn.extend({ 
    detectmouseoverdisabled: function(options) {
      var defaults = {
          tag : 'div',
          ext : '-mask',
          ele : 'input, textarea, select'    
      }
        
      var option =  $.extend(defaults, options);
      var hasDisabledElements=false; // we'll use it for compatibility reason with older version of this script
      // we want to find the width of the elements, even if they are hidden
      var getWidth=function(obj){
          var clone = obj.clone();
          clone.css("visibility","hidden");
          $('body').append(clone);
          var width = clone.outerWidth();
          clone.remove();
          return width;
      }
      // now we define the trick
      var proceed = function(elements) {
        return elements.each(function() {
          var $this=$(this);
          // check if the element passed is DISABLED
          if($this.prop('disabled')) {
            hasDisabledElements=true;
            var img = make_glif(1, 1, 1, 255); // fixes inconsistent cross-browser behavior
            // create the DIV element for the trick
            var pos = $this.position();
            var height=$this.outerHeight();
            // we want it to be with a relative position (in case of the element would be hidden during the initialization phase)
            // we wrap it with another DIV for this reason : http://jasonseale.hubpages.com/hub/Relative-Positioning-Leave-Blank-White-Space-on-Webpage
            $this.after('<div style="position:relative"><' + option.tag + ' id="' + this.id + option.ext + '" style="position:absolute; top:-' + height + 'px; left:0; width:' + getWidth($this) + 'px; height:' + height + 'px;"><img src="'+img+'" alt="" width="100%" height="100%" border="0px"></' + option.tag + '></div>'); 
          }
        });
      };
      // for compatibility with older version
      var ret=proceed($(this));
      if (!hasDisabledElements) ret=proceed($(this).find(option.ele));
      return ret;
        
        
// glif, a client-side image generator in javascript
// Copyright (C) 2005 Jeff Epler

// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

// The data: URL scheme is specified in rfc2397.
// My understanding of the GIF format is based on reading various documents
// and credit for the no-lzw way of writing gifs comes via libungif.

function base64(s) {
    var ch =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var c1, c2, c3, e1, e2, e3, e4;
    var l = s.length;
    var i = 0;
    var r = "";

    do {
        c1 = s.charCodeAt(i);
        e1 = c1 >> 2;
        c2 = s.charCodeAt(i+1);
        e2 = ((c1 & 3) << 4) | (c2 >> 4);
        c3 = s.charCodeAt(i+2);
        if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
        if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
        r += ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
    } while ((i += 3) < l);

    return r;
}

function bitstream() {
    this.bit = 1;
    this.byte_ = 0;
    this.data = "";

    this.write_bit = bitstream_write_bit;
    this.get = bitstream_get;
}

function bitstream_write_bit(b) {
    if(b) this.byte_ |= this.bit;
    this.bit <<= 1;
    if(this.bit == 256) {
        this.bit = 1;
        this.data += String.fromCharCode(this.byte_);
        this.byte_ = 0;
    }
}
function bitstream_get() {
    var result = "";
    var data = this.data;
    if(this.bit != 1) { data += String.fromCharCode(this.byte_); }
    for(i=0; i<data.length + 1; i+=255) {
        chunklen = data.length - i; if(chunklen < 0) chunklen = 0;
        if(chunklen > 255) chunklen=255;
        result += String.fromCharCode(chunklen) + data.substring(i,i+255);
    }
    return result + "\0"
}

function make_glif(w,h,d,fr,fg,fb) {
    var r = String.fromCharCode(w%256) + String.fromCharCode(w/256) + String.fromCharCode(h%256) + String.fromCharCode(h/256) 
    gif = "GIF89a" + r + "\xf0\0\0\xff\xff\xff" + String.fromCharCode(fr) + String.fromCharCode(fg) + String.fromCharCode(fb) + "\x21\xf9\4\1\0\0\0\0,\0\0\0\0" + r + "\0\2";

    var b = new bitstream();
    for(y=0; y<h; y++) {
        for(x=0; x<w; x++) {
            b.write_bit(d[x+w*y]); b.write_bit(0); b.write_bit(0);
            b.write_bit(0); b.write_bit(0); b.write_bit(1);
        }
    }
    gif += b.get() + ";" 

    return "data:image/gif;base64," + base64(gif);
}
// end
   }     
  }); 
})(jQuery); 
