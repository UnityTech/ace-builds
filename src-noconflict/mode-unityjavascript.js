ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {
    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, 
        DocCommentHighlightRules.getTagRule(),
        {
            defaultToken : "comment.doc",
            caseInsensitive: true
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
}

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var JavaScriptHighlightRules = function(options) {
    var keywordMapper = this.createKeywordMapper({
        "variable.language":
            "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"  + // Constructors
            "Namespace|QName|XML|XMLList|"                                             + // E4X
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
            "SyntaxError|TypeError|URIError|"                                          +
            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
            "isNaN|parseFloat|parseInt|"                                               +
            "JSON|Math|"                                                               + // Other
            "this|arguments|prototype|window|document"                                 , // Pseudo
        "keyword":
            "const|yield|import|get|set|" +
            "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
            "if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
            "__parent__|__count__|escape|unescape|with|__proto__|" +
            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static",
        "storage.type":
            "const|let|var|function",
        "constant.language":
            "null|Infinity|NaN|undefined",
        "support.function":
            "alert",
        "constant.language.boolean": "true|false"
    }, "identifier");
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    this.$rules = {
        "no_regex" : [
            {
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : /\/\*/,
                next : "comment"
            }, {
                token : "string",
                regex : "'(?=.)",
                next  : "qstring"
            }, {
                token : "string",
                regex : '"(?=.)',
                next  : "qqstring"
            }, {
                token : "constant.numeric", // hex
                regex : /0[xX][0-9a-fA-F]+\b/
            }, {
                token : "constant.numeric", // float
                regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
            }, {
                token : [
                    "storage.type", "punctuation.operator", "support.function",
                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
                ],
                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "paren.lparen"
                ],
                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "text", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : "keyword",
                regex : "(?:" + kwBeforeRe + ")\\b",
                next : "start"
            }, {
                token : ["punctuation.operator", "support.function"],
                regex : /(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
            }, {
                token : ["punctuation.operator", "support.function.dom"],
                regex : /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
            }, {
                token : ["punctuation.operator", "support.constant"],
                regex : /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
            }, {
                token : ["support.constant"],
                regex : /that\b/
            }, {
                token : ["storage.type", "punctuation.operator", "support.function.firebug"],
                regex : /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
            }, {
                token : keywordMapper,
                regex : identifierRe
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,
                next  : "start"
            }, {
                token : "punctuation.operator",
                regex : /[?:,;.]/,
                next  : "start"
            }, {
                token : "paren.lparen",
                regex : /[\[({]/,
                next  : "start"
            }, {
                token : "paren.rparen",
                regex : /[\])}]/
            }, {
                token: "comment",
                regex: /^#!.*$/
            }
        ],
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment_regex_allowed"
            }, {
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment_regex_allowed"
            }, {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token : "text",
                regex : "\\s+|^$",
                next : "start"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "regex": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                token : "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {
                token : "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token : "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                token: "regexp.charclass.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ],
        "function_arguments": [
            {
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: "[, ]+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "comment_regex_allowed" : [
            DocCommentHighlightRules.getTagRule(),
            {token : "comment", regex : "\\*\\/", next : "start"},
            {defaultToken : "comment", caseInsensitive: true}
        ],
        "comment" : [
            DocCommentHighlightRules.getTagRule(),
            {token : "comment", regex : "\\*\\/", next : "no_regex"},
            {defaultToken : "comment", caseInsensitive: true}
        ],
        "line_comment_regex_allowed" : [
            DocCommentHighlightRules.getTagRule(),
            {token : "comment", regex : "$|^", next : "start"},
            {defaultToken : "comment", caseInsensitive: true}
        ],
        "line_comment" : [
            DocCommentHighlightRules.getTagRule(),
            {token : "comment", regex : "$|^", next : "no_regex"},
            {defaultToken : "comment", caseInsensitive: true}
        ],
        "qqstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                next  : "qqstring"
            }, {
                token : "string",
                regex : '"|$',
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ],
        "qstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                next  : "qstring"
            }, {
                token : "string",
                regex : "'|$",
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ]
    };
    
    
    if (!options || !options.noES6) {
        this.$rules.no_regex.unshift({
            regex: "[{}]", onMatch: function(val, state, stack) {
                this.next = val == "{" ? this.nextState : "";
                if (val == "{" && stack.length) {
                    stack.unshift("start", state);
                    return "paren";
                }
                if (val == "}" && stack.length) {
                    stack.shift();
                    this.next = stack.shift();
                    if (this.next.indexOf("string") != -1)
                        return "paren.quasi.end";
                }
                return val == "{" ? "paren.lparen" : "paren.rparen";
            },
            nextState: "start"
        }, {
            token : "string.quasi.start",
            regex : /`/,
            push  : [{
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "paren.quasi.start",
                regex : /\${/,
                push  : "start"
            }, {
                token : "string.quasi.end",
                regex : /`/,
                next  : "pop"
            }, {
                defaultToken: "string.quasi"
            }]
        });
    }
    
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("no_regex") ]);
    
    this.normalizeRules();
};

oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

exports.JavaScriptHighlightRules = JavaScriptHighlightRules;
});

ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = {};
var initContext = function(editor) {
    var id = -1;
    if (editor.multiSelect) {
        id = editor.selection.index;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = {rangeCount: editor.multiSelect.rangeCount};
    }
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = {
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
    };
};

var CstyleBehaviour = function() {
    this.add("braces", "insertion", function(state, action, editor, session, text) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '{') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '{' + selected + '}',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                if (/[\]\}\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) {
                    CstyleBehaviour.recordAutoInsert(editor, session, "}");
                    return {
                        text: '{}',
                        selection: [1, 1]
                    };
                } else {
                    CstyleBehaviour.recordMaybeInsert(editor, session, "{");
                    return {
                        text: '{',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == '}') {
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}') {
                var matching = session.$findOpeningBracket('}', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == "\n" || text == "\r\n") {
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
                closing = lang.stringRepeat("}", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
            }
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '}') {
                var openBracePos = session.findMatchingBracket({row: cursor.row, column: cursor.column+1}, '}');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
            } else if (closing) {
                var next_indent = this.$getIndent(line);
            } else {
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
            }
            var indent = next_indent + session.getTabString();

            return {
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
            };
        } else {
            CstyleBehaviour.clearMaybeInsertedClosing();
        }
    });

    this.add("braces", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '{') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '}') {
                range.end.column++;
                return range;
            } else {
                context.maybeInsertedBrackets--;
            }
        }
    });

    this.add("parens", "insertion", function(state, action, editor, session, text) {
        if (text == '(') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '(' + selected + ')',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return {
                    text: '()',
                    selection: [1, 1]
                };
            }
        } else if (text == ')') {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') {
                var matching = session.$findOpeningBracket(')', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("parens", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("brackets", "insertion", function(state, action, editor, session, text) {
        if (text == '[') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return {
                    text: '[' + selected + ']',
                    selection: false
                };
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return {
                    text: '[]',
                    selection: [1, 1]
                };
            }
        } else if (text == ']') {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') {
                var matching = session.$findOpeningBracket(']', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("brackets", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return {
                    text: quote + selected + quote,
                    selection: false
                };
            } else {
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                if (leftChar == '\\') {
                    return null;
                }
                var tokens = session.getTokens(selection.start.row);
                var col = 0, token;
                var quotepos = -1; // Track whether we're inside an open quote.

                for (var x = 0; x < tokens.length; x++) {
                    token = tokens[x];
                    if (token.type == "string") {
                      quotepos = -1;
                    } else if (quotepos < 0) {
                      quotepos = token.value.indexOf(quote);
                    }
                    if ((token.value.length + col) > selection.start.column) {
                        break;
                    }
                    col += tokens[x].value.length;
                }
                if (!token || (quotepos < 0 && token.type !== "comment" && (token.type !== "string" || ((selection.start.column !== token.value.length+col-1) && token.value.lastIndexOf(quote) === token.value.length-1)))) {
                    if (!CstyleBehaviour.isSaneInsertion(editor, session))
                        return;
                    return {
                        text: quote + quote,
                        selection: [1,1]
                    };
                } else if (token && token.type === "string") {
                    var rightChar = line.substring(cursor.column, cursor.column + 1);
                    if (rightChar == quote) {
                        return {
                            text: '',
                            selection: [1, 1]
                        };
                    }
                }
            }
        }
    });

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
                range.end.column++;
                return range;
            }
        }
    });

};

    
CstyleBehaviour.isSaneInsertion = function(editor, session) {
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
    }
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
};

CstyleBehaviour.$matchTokenType = function(token, types) {
    return types.indexOf(token.type || token) > -1;
};

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
};

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
};

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
};

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
};

CstyleBehaviour.popAutoInsertedClosing = function() {
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
};

CstyleBehaviour.clearMaybeInsertedClosing = function() {
    if (context) {
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
    }
};



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
});

ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/)#(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var WorkerClient = require("../worker/worker_client").WorkerClient;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = JavaScriptHighlightRules;
    
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start" || state == "no_regex") {
            var match = line.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start" || endState == "no_regex") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("jslint", function(results) {
            session.setAnnotations(results.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };

    this.$id = "ace/mode/javascript";
}).call(Mode.prototype);

exports.Mode = Mode;
});

ace.define("ace/mode/unityjavascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;

var unityjavascriptHighlightRules = function() {

    var JSRules = new JavaScriptHighlightRules().getRules();

    var rules = {};

    for (var key in JSRules) {
      rules[key] = JSRules[key];
    }

    rules.start = [
    { token: 'support.class.js.unity',
    regex: '\\b(?:AddComponentMenu|Animation|AnimationClip|AnimationCurve|AnimationEvent|AnimationState|Application|Array|AssetBundle|AudioClip|AudioListener|AudioSource|Behaviour|BitStream|BoneWeight|Bounds|BoxCollider|Camera|CapsuleCollider|CharacterController|CharacterJoint|Collider|Collision|Color|Component|ConfigurableJoint|ConstantForce|ContactPoint|ContextMenu|ControllerColliderHit|Coroutine|Cubemap|Debug|Event|ExecuteInEditMode|FixedJoint|Flare|Font|GameObject|GeometryUtility|Gizmos|GL|Graphics|GUI|GUIContent|GUIElement|GUILayer|GUILayout|GUILayoutOption|GUILayoutUtility|GUISettings|GUISkin|GUIStyle|GUIStyleState|GUIText|GUITexture|GUIUtility|Hashtable|HideInInspector|HingeJoint|HostData|Input|Joint|JointDrive|JointLimits|JointMotor|JointSpring|Keyframe|LayerMask|LensFlare|Light|LightmapData|LightmapSettings|LineRenderer|MasterServer|Material|MaterialPropertyBlock|Mathf|Matrix4x4|Mesh|MeshCollider|MeshFilter|MeshRenderer|MonoBehaviour|MovieTexture|Network|NetworkMessageInfo|NetworkPlayer|NetworkView|NetworkViewID|NonSerialized|Object|Particle|ParticleAnimator|ParticleEmitter|ParticleRenderer|Path|PhysicMaterial|Physics|Ping|Plane|PlayerPrefs|PlayerPrefsException|Projector|QualitySettings|Quaternion|Random|Ray|RaycastCollider|RaycastHit|Rect|RectOffset|RenderBeforeQueues|Renderer|RenderSettings|RenderTexture|RequireComponent|Resolution|Resources|Rigidbody|RPC|Screen|ScriptableObject|Serializable|Shader|SkinnedMeshRenderer|Skybox|SoftJointLimit|SphereCollider|SpringJoint|String|SystemInfo|Terrain|TerrainCollider|TerrainData|TextAsset|TextMesh|Texture|Texture2D|Time|TrailRenderer|Transform|Vector2|Vector3|Vector4|WaitForEndOfFrame|WaitForFixedUpdate|WaitForSeconds|WheelCollider|WheelFrictionCurve|WheelHit|WWW|WWWForm|YieldInstruction|Ani|iPhone|iPhoneAccelerationEvent|iPhoneInput|iPhoneOrientation|iPhoneSettings|iPhoneTouch|iPhoneTouchPhase|SpriteManager|LinkedSpriteManager|Sprite| )\\b' },
    { token: 'support.function.js.unity',
    regex: '\\b(?:a|Abs|absoluteURL|AcceptDrag|Acos|active|activeControlID|activeGameObject|activeObject|activeTerrain|activeTransform|Add|AddBinaryData|AddClip|addCollider|AddColor|AddComponent|AddComponentMenu|AddEvent|AddExplosionForce|AddField|AddFloat|AddForce|AddForceAtPosition|AddKey|AddMatrix|AddMixingTransform|AddObjectToAsset|AddRelativeForce|AddRelativeTorque|AddTorque|AddVector|alignment|allCameras|AllocateViewID|alt|ambientLight|anchor|Angle|angle|AngleAxis|angularDrag|angularVelocity|angularXDrive|angularXMotion|angularYLimit|angularYMotion|angularYZDrive|angularZLimit|angularZMotion|animatePhysics|animation|AnimationClip|AnimationCurve|AnimationEvent|animationState|anisoLevel|anyKey|anyKeyDown|applicationContentsPath|Apply|Approximately|Asin|aspect|aspectRatio|assetBundle|assetImporter|assetPath|AssetPathToGUID|asymptoteSlip|asymptoteValue|Atan|Atan2|attachedRigidbody|attenuate|audio|audioClip|autodestruct|autoRepaintOnSceneChange|axis|b|background|backgroundColor|bakeIK|barycentricCoordinate|basemapDistance|Begin|BeginArea|BeginGroup|BeginHorizontal|BeginScrollView|BeginVertical|bindposes|black|Blend|blendMode|blue|boneIndex0|boneIndex1|boneIndex2|boneIndex3|bones|boneWeights|border|borderMipmap|bottom|bounceCombine|bounceThreshold|bouncyness|Bounds|bounds|Box|box|brakeTorque|Break|breakForce|breakTorque|brightness|BringWindowToBack|BringWindowToFront|BroadcastMessage|BuildAssetBundle|BuildPlayer|Button|button|bytes|CalcHeight|CalcMinMaxWidth|CalcScreenSize|CalcSize|CalculateFrustumPlanes|camera|cameraToWorldMatrix|cameraVelocityScale|CancelQuit|CanStreamedLevelBeLoaded|capsLock|captureFramerate|CaptureScreenshot|castShadows|Ceil|CeilToInt|center|centerOfMass|changed|channels|character|CheckCapsule|CheckSphere|childCount|Clamp|Clamp01|Clear|clear|ClearCurves|clearFlags|ClearHostList|ClearParticles|ClearProgressBar|ClearUndo|clickCount|clip|clipAnimations|clipping|CloneComponent|Close|CloseConnection|ClosestPointOnBounds|ClosestPowerOfTwo|CollectDependencies|collider|collisionFlags|Color|color|colorAnimation|colors|Combine|command|comment|CompareTag|compressionBitrate|Concat|configuredInWorldSpace|Connect|connectedBody|connectedPlayers|connections|connectionTesterIP|connectionTesterPort|constantForce|contacts|Contains|contentColor|contentOffset|context|ContextMenu|control|controller|convertToNormalmap|convex|cookie|CopyAsset|CopyFileOrDirectory|CopyFileOrDirectoryFollowSymlinks|CopyFrom|CopyPropertiesFromMaterial|CopySerialized|correctGamma|Cos|Create|CreateAsset|CreateEmptyPrefab|CreateInstance|CreatePrimitive|CreateTerrainGameObject|Cross|CrossFade|CrossFadeQueued|Cubemap|cullingMask|current|currentLevel|currentResolution|currentScene|cursorColor|cursorFlashSpeed|curve|customStyles|cyan|damper|damping|data|dataPath|decompressOnLoad|DecreaseLevel|dedicatedServer|Deg2Rad|DeleteAll|DeleteAsset|DeleteFileOrDirectory|DeleteKey|delta|deltaTime|depth|Destroy|DestroyImmediate|DestroyPlayerObjects|DetachChildren|detailObjectDistance|detectCollisions|direction|Disconnect|DisplayDialog|DisplayDialogComplex|DisplayProgressBar|DisplayWizard|Dispose|Distance|distance|doesAnimateColor|DontDestroyOnLoad|Dot|doubleClickSelectsWord|drag|DragWindow|Draw|DrawCube|DrawGizmo|DrawGUITexture|DrawIcon|DrawLine|DrawMesh|DrawMeshNow|DrawRay|DrawSphere|DrawTexture|DrawWireCube|DrawWireSphere|DrawWithTextSelection|dynamicFriction|dynamicFriction2|EaseInOut|EditorWindow|Emit|emit|emitterVelocityScale|enabled|Encapsulate|EncodeToPNG|End|EndArea|EndGroup|EndHorizontal|EndScrollView|EndVertical|endWidth|energy|Epsilon|error|errorString|EscapeURL|Euler|eulerAngles|Evaluate|ExitGUI|Exp|Expand|ExpandHeight|ExpandWidth|extents|ExternalCall|ExternalEval|externalIP|externalPort|ExtractOggFile|extremumSlip|extremumValue|fadeout|farClipPlane|fieldOfView|filterMode|Find|FindAsset|FindGameObjectsWithTag|FindObjectOfType|FindObjectsOfType|FindStyle|FindTexture|FindWithTag|firstFrame|fixedDeltaTime|fixedHeight|fixedTime|fixedWidth|flare|flareStrength|FlexibleSpace|FloatField|Floor|FloorToInt|FocusControl|focused|FocusWindow|fog|fogColor|fogDensity|font|force|format|FormatBytes|forward|forwardDir|forwardFriction|forwardSlip|frameCount|frameRate|freeSpin|freezeRotation|frictionCombine|frictionDirection2|FromToRotation|fullScreen|functionKey|functionName|g|gameName|GameObject|gameObject|gameObjects|gameType|generateAnimations|generateCubemap|generateMaterials|GenerateUniqueAssetPath|GetAllCurves|GetAnimatableProperties|GetAnimationEvents|GetAspectRect|GetAssetPath|GetAtPath|GetAveragePing|GetAxis|GetAxisRaw|GetBool|GetButton|GetButtonDown|GetButtonUp|GetCachedIcon|GetClass|GetClipCount|GetColor|GetColumn|GetComponent|GetComponentInChildren|GetComponents|GetComponentsInChildren|GetControlID|GetCursorPixelPosition|GetCursorStringIndex|GetDirectoryName|GetDistanceToPoint|GetDragAndDropTitle|GetEditorAssetBundle|GetEditorCurve|GetExtension|GetFileName|GetFileNameWithoutExtension|GetFiltered|GetFloat|GetFloatValue|GetGenericData|GetGroundHit|GetHeights|GetInstanceID|GetInt|GetInterpolatedNormal|GetKey|GetKeyDown|GetKeyUp|GetLastPing|GetMatrix|GetMouseButton|GetMouseButtonDown|GetMouseButtonUp|GetObjectEnabled|GetPixel|GetPixelBilinear|GetPixels|GetPoint|GetPointVelocity|GetPostprocessOrder|GetPropertyEditorTitle|GetRect|GetRelativePointVelocity|GetRow|GetScreenRect|GetSide|GetStateObject|GetStreamProgressForLevel|GetString|GetStyle|GetTag|GetTemporary|GetTexture|GetTextureOffset|GetTextureScale|GetTransforms|GetTriangles|GetTypeForControl|GetVector|globalScale|graphicsDeviceName|graphicsDeviceVendor|graphicsDeviceVersion|graphicsMemorySize|gravity|gray|grayscale|grayscaleToAlpha|green|grey|group|GUIContent|GUIDToAssetPath|GUIStyle|guiText|guiTexture|GUIToScreenPoint|haloStrength|HasCharacter|HasHelpForObject|HasKey|HasNamedHelp|HasProperty|hasTitle|HavePublicAddress|headers|Height|height|heightmapHeight|heightmapMaximumLOD|heightmapPixelError|heightmapScale|heightmapWidth|helpString|hideFlags|highAngularXLimit|highTwistLimit|hingeJoint|HitTest|horizontal|HorizontalScrollbar|horizontalScrollbar|horizontalScrollbarLeftButton|horizontalScrollbarRightButton|horizontalScrollbarThumb|HorizontalSlider|horizontalSlider|horizontalSliderThumb|hotControl|hover|IconContent|identity|IgnoreCollision|ignoreLayers|ignoreListenerVolume|image|imagePosition|ImportAsset|incomingPassword|IncreaseLevel|inertiaTensor|inertiaTensorRotation|Infinity|InitializeSecurity|InitializeServer|inputString|insideUnitCircle|insideUnitSphere|Instantiate|InstantiatePrefab|inTangent|intensity|interpolation|IntersectRay|IntField|Inverse|inverse|InverseLerp|InverseTransformDirection|InverseTransformPoint|ip|ipAddress|IsChildOf|isClient|IsCreated|isCubemap|isDebugBuild|isDone|isEditor|isGrounded|isIdentity|isKey|isKinematic|isLoadingLevel|isMessageQueueRunning|isMine|isMouse|IsPlaying|isPlaying|isPowerOfTwo|isReading|isReadyToPlay|isServer|IsSleeping|isSupported|isTrigger|isValid|isWriting|Join|keyboardControl|KeyboardEvent|keyCode|Keyframe|keys|Label|label|lastFrame|layer|LayerToName|left|length|lengthScale|Lerp|LerpAngle|levelCount|light|lighting|lightmap|lightmapIndex|lightmaps|lightmapTilingOffset|limit|limits|Linear|linearLimit|Linecast|lineHeight|LINES|lineSpacing|Load|LoadAll|LoadAssetAtPath|loadedLevel|loadedLevelName|LoadIdentity|LoadImage|LoadImageIntoTexture|LoadLevel|LoadLevelAdditive|LoadMainAssetAtPath|LoadOrtho|LoadPixelMatrix|LoadProjectionMatrix|LoadUnityWeb|localEulerAngles|localPosition|localRotation|localRotationAxis|localScale|localToWorldMatrix|localVelocity|lockCursor|Log|Log10|LogError|LogWarning|LookAt|LookRotation|loop|lossyScale|lowAngularXLimit|lowTwistLimit|magenta|magnitude|main|mainAsset|mainTexture|mainTextureOffset|mainTextureScale|MakeSnapshot|MangleVariableName|margin|mass|Material|material|materials|matrix|Max|max|maxAngularVelocity|maxBounce|maxConnections|maxDistance|maxEmission|maxEnergy|MaxHeight|maximumForce|maxParticleSize|maxSize|maxTextureSize|maxVolume|MaxWidth|MenuCommand|MenuItem|Mesh|mesh|messageOptions|Min|min|minBounce|minDistance|minEmission|minEnergy|MinHeight|minimumAllocatableViewIDs|MinMaxRect|minPenetrationForPenalty|minSize|minVolume|MinWidth|mipMapBias|mipmapCount|mipmapEnabled|mipmapFadeDistanceEnd|mipmapFadeDistanceStart|mipmapFilter|mode|modelview|motor|motorTorque|mousePosition|Move|MoveAsset|MoveAssetToTrash|moveDirection|MoveFileOrDirectory|MoveKey|moveLength|MovePosition|MoveRotation|movie|MultiplyPoint|MultiplyPoint3x4|MultiplyVector|MultiTexCoord|MultiTexCoord2|MultiTexCoord3|MultMatrix|name|NameToLayer|natFacilitatorIP|natFacilitatorPort|nearClipPlane|NegativeInfinity|NetworkPlayer|networkView|NewScene|none|normal|Normalize|normalized|normalizedSpeed|normalizedTime|normalmapFilter|normals|normalSmoothingAngle|npotScale|numeric|ObjectContent|ObjectField|objectReferences|objects|observed|oggVorbis|onActive|one|onFocused|onHover|onNormal|onUnitSphere|OpenAsset|OpenFilePanel|OpenScene|OpenSceneAdditive|OpenURL|Optimize|origin|Ortho|orthographic|orthographicSize|OrthoNormalize|otherCollider|outTangent|overflow|OverlapSphere|owner|PackTextures|padding|parent|particleCount|particleEmitter|particleRenderMode|particles|passCount|passwordProtected|path|paths|Pause|pause|peerType|PerformRedo|PerformUndo|Perspective|PhysicMaterial|PI|Ping|PingPong|pitch|pixelHeight|pixelInset|pixelLightCount|pixelOffset|pixelRect|pixelWidth|Plane|platform|Play|playAutomatically|PlayClipAtPoint|player|playerLimit|playOnAwake|PlayOneShot|PlayQueued|point|PollHostList|Pop|PopAssetDependencies|PopMatrix|Popup|port|position|positionDamper|positionSpring|postWrapMode|Pow|PrepareStartDrag|preview|preWrapMode|progress|Project|projectionAngle|projectionDistance|projectionMatrix|projectionMode|propertyName|PropertyToID|proxyIP|proxyPassword|proxyPort|Push|PushAssetDependencies|PushMatrix|QUADS|quality|Quaternion|QueryStateObject|Quit|r|Rad2Deg|radius|Range|range|Ray|Raycast|RaycastAll|ReadPixels|realtimeSinceStartup|RecalculateBounds|RecalculateNormals|recalculateNormals|receiveShadows|recommendedTextureFormat|Rect|rect|RectField|red|reduceKeyframes|Reflect|Refresh|refreshRate|RegisterHost|RegisterSceneUndo|RegisterUndo|relativeForce|relativeTorque|relativeVelocity|Release|ReleaseTemporary|Remove|RemoveAt|RemoveClip|RemoveKey|RemoveRPCs|RemoveRPCsInGroup|Render|RenderBeforeQueues|renderer|renderMode|RenderTexture|RenderToCubemap|RenderWithShader|Repaint|Repeat|RepeatButton|ReplacePrefab|RequestHostList|RequireComponent|ResetAspect|ResetInputAxes|ResetProjectionMatrix|ResetReplacementShader|ResetWorldToCameraMatrix|Resize|resolutions|RestoreSnapshot|Reverse|Rewind|right|rigidbody|rndForce|rndVelocity|rolloffFactor|root|Rotate|RotateAround|RotateAroundPivot|RotateTowards|rotation|rotationDriveMode|Round|RoundToInt|RPC|rpm|runInBackground|SameSide|Sample|SampleAnimation|SampleHeight|SaveAssets|SaveCurrentSceneIfUserWantsTo|SaveFilePanel|SaveScene|SaveSnapshot|Scale|ScaleAroundPivot|ScreenPointToRay|ScreenToGUIPoint|ScreenToViewportPoint|ScreenToWorldPoint|seed|selectionColor|SelectionGrid|sender|SendMessage|SendMessageUpwards|sendRate|Serialize|Set3Points|SetActiveRecursively|SetAnimationEvents|SetBool|SetBorderColor|SetColor|SetColors|SetColumn|SetCurve|SetDensity|SetDirty|SetEditorCurve|SetFloat|SetFromToRotation|SetGenericData|SetGlobalColor|SetGlobalFloat|SetGlobalMatrix|SetGlobalShaderProperty|SetGlobalTexture|SetGlobalVector|SetHeights|SetInt|SetLevelPrefix|SetLookRotation|SetMatrix|SetMinMax|SetNeighbors|SetNextControlName|SetNormalAndPosition|SetObjectEnabled|SetPass|SetPixel|SetPixels|SetPosition|SetReceivingEnabled|SetReplacementShader|SetResolution|SetRevertBackfacing|SetRow|SetScope|SetSendingEnabled|SetString|SetTexture|SetTextureOffset|SetTextureScale|settings|SetTriangles|SetTRS|SetVector|SetVertexCount|SetWidth|shader|shadowCascades|shadowConstantBias|shadowDistance|shadowObjectSizeBias|shadows|shadowStrength|sharedMaterial|sharedMaterials|sharedMesh|Shift|shift|Show|showCursor|ShowHelpForObject|ShowNamedHelp|sidewaysDir|sidewaysFriction|sidewaysSlip|Sign|SimpleMove|Sin|size|sizeGrow|skin|skinNormals|skybox|Sleep|sleepAngularVelocity|sleepVelocity|Slerp|slerpDrive|Slider|slopeLimit|SmoothDamp|SmoothDampAngle|smoothDeltaTime|smoothSphereCollisions|SmoothStep|SmoothTangents|softVegetation|solverIterationCount|Sort|Space|speed|splitAnimations|splitTangentsAcrossSeams|spotAngle|spring|SqrDistance|sqrMagnitude|Sqrt|srcValue|StartAssetEditing|StartDrag|startWidth|stateSynchronization|staticFriction|staticFriction2|steerAngle|stepOffset|stiffness|Stop|StopAssetEditing|streamedBytes|stretchHeight|stretchWidth|subMeshCount|supportsImageEffects|SupportsRenderTextureFormat|supportsRenderTextures|supportsShadows|suspensionDistance|suspensionSpring|swapUVChannels|swing1Limit|swing2Limit|swingAxis|SyncLayer|tabSize|tag|Tan|tangents|targetAngularVelocity|targetPosition|targetRotation|targetTexture|targetVelocity|terrainData|TestConnection|TestConnectionNAT|TestPlanesAABB|TexCoord|TexCoord2|TexCoord3|text|TextArea|textArea|textColor|TextContent|TextField|textField|texture|Texture2D|textureCoord|textureCoord2|textureFormat|thisCollider|time|timeScale|timeSinceLevelLoad|timestamp|ToAngleAxis|Toggle|toggle|Toolbar|tooltip|top|torque|transform|TransformDirection|TransformPoint|transforms|Translate|transpose|treeBillboardDistance|treeCrossFadeLength|treeDistance|treeMaximumFullLODCount|triangleIndex|TRIANGLES|triangles|TRIANGLE_STRIP|tripleClickSelectsLine|TRS|type|unassigned|UnEscapeURL|UnfocusWindow|unityVersion|Unload|UnloadLoadedObjects|UnregisterHost|Unshift|up|Update|updateRate|updateWhenOffscreen|uploadProgress|url|Use|useConeFriction|useGravity|useLimits|useMipMap|useMotor|useNat|useProxy|userData|useSpring|useWorldSpace|uv|uv2|uvAnimationCycles|uvAnimationXTile|uvAnimationYTile|ValidateMoveAsset|value|Vector2Field|Vector3Field|velocity|velocityScale|velocityUpdateMode|Vertex|Vertex3|vertexCount|vertical|VerticalScrollbar|verticalScrollbar|verticalScrollbarDownButton|verticalScrollbarThumb|verticalScrollbarUpButton|VerticalSlider|verticalSlider|verticalSliderThumb|vertices|viewID|Viewport|ViewportPointToRay|ViewportToScreenPoint|ViewportToWorldPoint|visualMode|volume|w|WakeUp|weight|weight0|weight1|weight2|weight3|white|Width|width|Window|window|wordWrap|worldCenterOfMass|worldRotationAxis|worldToCameraMatrix|worldToLocalMatrix|WorldToScreenPoint|WorldToViewportPoint|worldVelocity|wrapMode|x|xDrive|xMax|xMin|xMotion|y|yDrive|yellow|yMax|yMin|yMotion|z|zDrive|zero|zMotion|To|From|By|yield|GetTouch|GetAccelerationEvent|SetSizeXY|SetSizeXZ|SetSizeYZ|SetBuffers|Transform|TransformBillboarded|SetColor|PixelSpaceToUVSpace|PixelSpaceToUVSpace|PixelCoordToUVCoord|PixelCoordToUVCoord|AddSprite|SetBillboarded|RemoveSprite|GetSprite|TransformBillboarded|UpdatePositions|UpdateUV|UpdateColors|UpdateBounds|ScheduleBoundsUpdate|CancelBoundsUpdate|To|From|By|StopAll| )\\b',
    caseInsensitive: true },
    { token: 'support.constant.js.unity',
    regex: '\\b(?:AnimationBlendMode|Additive|Blend|AudioImporterChannels|Automatic|Mono|Stereo|AudioImporterFormat|Automatic|OggVorbis|Uncompressed|AudioVelocityUpdateMode|Auto|Dynamic|Fixed|BuildAssetBundleOptions|CollectDependencies|CompleteAssets|BuildOptions|AutoRunPlayer|BuildAdditionalStreamedScenes|CompressTextures|ShowBuiltPlayer|StripDebugSymbols|BuildTarget|DashboardWidget|StandaloneOSXIntel|StandaloneOSXPPC|StandaloneOSXUniversal|StandaloneWindows|WebPlayerStreamed|WebPlayer|CameraClearFlags|Depth|Nothing|Skybox|SolidColor|CollisionFlags|Above|Below|None|Sides|ConfigurableJointMotion|Free|Limited|Locked|ConnectionTesterStatus|Error|PrivateIPHasNATPunchThrough|PrivateIPNoNATPunchthrough|PublicIPIsConnectable|PublicIPNoServerStarted|PublicIPPortBlocked|Undetermined|CubemapFace|NegativeX|NegativeY|NegativeZ|PositiveX|PositiveY|PositiveZ|DragAndDropVisualMode|Copy|Generic|Link|Move|None|EventType|ContextClick|DragExited|DragPerform|DragUpdated|ExecuteCommand|Ignore|KeyDown|KeyUp|Layout|MouseDown|MouseDrag|MouseMove|MouseUp|Repaint|ScrollWheel|Used|ValidateCommand|FilterMode|Bilinear|Point|Trilinear|FocusType|Keyboard|Native|Passive|ForceMode|Acceleration|Force|Impulse|VelocityChange|GizmoType|Active|NotSelected|Pickable|SelectedOrChild|Selected|HideFlags|DontSave|HideAndDontSave|HideInHierarchy|HideInInspector|NotEditable|ImagePosition|ImageAbove|ImageLeft|ImageOnly|TextOnly|ImportAssetOptions|Default|ForceDisplayPrefs|ForceSynchronousImport|ForceUpdate|ImportRecursive|MayCancelImport|RefreshDoesStartStopAssetEditing|TryFastReimportFromMetaData|JointDriveMode|None|PositionAndVelocity|Position|Velocity|JointProjectionMode|None|PositionAndRotation|PositionOnly|KeyCode|Alpha0|Alpha1|Alpha2|Alpha3|Alpha4|Alpha5|Alpha6|Alpha7|Alpha8|Alpha9|AltGr|Ampersand|Asterisk|At|A|BackQuote|Backslash|Backspace|Break|B|CapsLock|Caret|Clear|Colon|Comma|C|Delete|Dollar|DoubleQuote|DownArrow|D|End|Equals|Escape|Exclaim|E|F10|F11|F12|F13|F14|F15|F1|F2|F3|F4|F5|F6|F7|F8|F9|F|Greater|G|Hash|Help|Home|H|Insert|I|Joystick1Button0|Joystick1Button10|Joystick1Button11|Joystick1Button12|Joystick1Button13|Joystick1Button14|Joystick1Button15|Joystick1Button16|Joystick1Button17|Joystick1Button18|Joystick1Button19|Joystick1Button1|Joystick1Button2|Joystick1Button3|Joystick1Button4|Joystick1Button5|Joystick1Button6|Joystick1Button7|Joystick1Button8|Joystick1Button9|Joystick2Button0|Joystick2Button10|Joystick2Button11|Joystick2Button12|Joystick2Button13|Joystick2Button14|Joystick2Button15|Joystick2Button16|Joystick2Button17|Joystick2Button18|Joystick2Button19|Joystick2Button1|Joystick2Button2|Joystick2Button3|Joystick2Button4|Joystick2Button5|Joystick2Button6|Joystick2Button7|Joystick2Button8|Joystick2Button9|Joystick3Button0|Joystick3Button10|Joystick3Button11|Joystick3Button12|Joystick3Button13|Joystick3Button14|Joystick3Button15|Joystick3Button16|Joystick3Button17|Joystick3Button18|Joystick3Button19|Joystick3Button1|Joystick3Button2|Joystick3Button3|Joystick3Button4|Joystick3Button5|Joystick3Button6|Joystick3Button7|Joystick3Button8|Joystick3Button9|JoystickButton0|JoystickButton10|JoystickButton11|JoystickButton12|JoystickButton13|JoystickButton14|JoystickButton15|JoystickButton16|JoystickButton17|JoystickButton18|JoystickButton19|JoystickButton1|JoystickButton2|JoystickButton3|JoystickButton4|JoystickButton5|JoystickButton6|JoystickButton7|JoystickButton8|JoystickButton9|J|Keypad0|Keypad1|Keypad2|Keypad3|Keypad4|Keypad5|Keypad6|Keypad7|Keypad8|Keypad9|KeypadDivide|KeypadEnter|KeypadEquals|KeypadMinus|KeypadMultiply|KeypadPeriod|KeypadPlus|K|LeftAlt|LeftApple|LeftArrow|LeftBracket|LeftControl|LeftParen|LeftShift|LeftWindows|Less|L|Minus|Mouse0|Mouse1|Mouse2|Mouse3|Mouse4|Mouse5|Mouse6|M|Numlock|N|O|PageDown|PageUp|Pause|Period|Plus|Print|P|Question|Quote|Q|Return|RightAlt|RightApple|RightArrow|RightBracket|RightControl|RightParen|RightShift|RightWindows|R|ScrollLock|Semicolon|Slash|Space|SysReq|S|Tab|T|Underscore|UpArrow|U|V|W|X|Y|Z|LightRenderMode|Auto|ForcePixel|ForceVertex|LightShadows|Hard|None|Soft|LightType|Directional|Point|Spot|MasterServerEvent|HostListReceived|RegistrationFailedGameName|RegistrationFailedGameType|RegistrationFailedNoServer|RegistrationSucceeded|ModelImporterGenerateAnimations|InNodes|InOriginalRoots|InRoot|None|ModelImporterGenerateMaterials|None|PerSourceMaterial|PerTexture|MouseCursor|Arrow|ResizeHorizontal|ResizeVertical|Text|NetworkConnectionError|AlreadyConnectedToAnotherServer|ConnectionBanned|ConnectionFailed|CreateSocketOrThreadFailure|EmptyConnectTarget|IncorrectParameters|InternalDirectConnectFailed|InvalidPassword|NATTargetConnectionLost|NATTargetNotConnected|NoError|RSAPublicKeyMismatch|TooManyConnectedPlayers|NetworkDisconnection|Disconnected|LostConnection|NetworkPeerType|Client|Connecting|Disconnected|Server|NetworkStateSynchronization|Off|ReliableDeltaCompressed|Unreliable|ParticleRenderMode|Billboard|HorizontalBillboard|SortedBillboard|Stretch|VerticalBillboard|PhysicMaterialCombine|Average|Maximum|Minimum|Multiply|PlayMode|StopAll|StopSameLayer|PrefabType|DisconnectedModelPrefabInstance|DisconnectedPrefabInstance|MissingPrefabInstance|ModelPrefabInstance|ModelPrefab|None|PrefabInstance|Prefab|PrimitiveType|Capsule|Cube|Cylinder|Plane|Sphere|QualityLevel|Beautiful|Fantastic|Fastest|Fast|Good|Simple|QueueMode|CompleteOthers|PlayNow|RenderTextureFormat|ARGB32|Depth|ReplacePrefabOptions|ConnectToPrefab|Default|ReplaceNameBased|RigidbodyInterpolation|Extrapolate|Interpolate|None|RotationDriveMode|Slerp|XYAndZ|RPCMode|AllBuffered|All|OthersBuffered|Others|Server|RuntimePlatform|OSXDashboardPlayer|OSXEditor|OSXPlayer|OSXWebPlayer|WindowsPlayer|WindowsWebPlayer|ScaleMode|ScaleAndCrop|ScaleToFit|StretchToFill|SelectionMode|Assets|DeepAssets|Deep|Editable|ExcludePrefab|TopLevel|Unfiltered|SendMessageOptions|DontRequireReceiver|RequireReceiver|SkinQuality|Auto|Bone1|Bone2|Bone4|Space|Self|World|TerrainLighting|Lightmap|Pixel|Vertex|TextAlignment|Center|Left|Right|TextAnchor|LowerCenter|LowerLeft|LowerRight|MiddleCenter|MiddleLeft|MiddleRight|UpperCenter|UpperLeft|UpperRight|TextClipping|Clip|Overflow|TextureFormat|Alpha8|ARGB32|DXT1|DXT5|RGB24|TextureImporterFormat|Alpha8|ARGB16|ARGB32|Automatic|DXT1|DXT5|RGB16|RGB24|TextureImporterGenerateCubemap|Cylindrical|NiceSpheremap|None|SimpleSpheremap|Spheremap|TextureImporterMipFilter|BoxFilter|KaiserFilter|TextureImporterNormalFilter|Sobel|Standard|TextureImporterNPOTScale|None|ToLarger|ToNearest|ToSmaller|TextureWrapMode|Clamp|Repeat|WrapMode|ClampForever|Default|Loop|Once|PingPong|Mate|accelerationEvents|touches|touchCount|multiTouchEnabled|accelerationEventCount|acceleration|orientation|verticalOrientation|screenCanDarken|uniqueIdentifier|model|systemName|systemVersion|fingerId|position|positionDelta|timeDelta\t|tapCount|phase|Began|Moved|Stationary|Ended|Canceled|Unknown|Portrait|PortraitUpsideDown|LandscapeLeft|LandscapeRight|FaceUp|FaceDown|IPhonePlayer|SPRITE_PLANE|XY|XZ|YZ|WINDING_ORDER|CCW|CW| )\\b',
    caseInsensitive: true },
    { token: 'support.function.js.unity',
    regex: '\\b(?:Awake|CancelInvoke|FixedUpdate|Invoke|InvokeRepeating|IsInvoking|LateUpdate|OnApplicationPause|OnApplicationQuit|OnAssignMaterialModel|OnBecameInvisible|OnBecameVisible|OnCloseWindow|OnCollisionEnter|OnCollisionExit|OnCollisionStay|OnConnectedToServer|OnControllerColliderHit|OnDisable|OnDisconnectedFromServer|OnDrawGizmos|OnDrawGizmosSelected|OnEnable|OnFailedToConnect|OnFailedToConnectToMasterServer|OnGUI|OnHierarchyWindowChange|OnInspectorUpdate|OnJointBreak|OnLevelWasLoaded|OnMouseDown|OnMouseDrag|OnMouseEnter|OnMouseExit|OnMouseOver|OnMouseUp|OnNetworkInstantiate|OnParticleCollision|OnPlayerConnected|OnPlayerDisconnected|OnPostprocessAllAssets|OnPostprocessAudio|OnPostprocessModel|OnPostprocessTexture|OnPostRender|OnPreCull|OnPreprocessAudio|OnPreprocessModel|OnPreprocessTexture|OnPreRender|OnProjectWindowChange|OnRenderImage|OnRenderObject|OnSelectionChange|OnSerializeNetworkView|OnServerInitialized|OnTriggerEnter|OnTriggerExit|OnTriggerStay|OnWillRenderObject|OnWizardCreate|OnWizardOtherButton|OnWizardUpdate|Reset|Start|StartCoroutine|StopAllCoroutines|StopCoroutine|Update|AudioImporterChannels|AudioImporterFormat|BuildAssetBundleOptions|BuildOptions|BuildTarget|DragAndDropVisualMode|GizmoType|ImportAssetOptions|ModelImporterGenerateAnimations|ModelImporterGenerateMaterials|MouseCursor|PrefabType|ReplacePrefabOptions|SelectionMode|TextureImporterFormat|TextureImporterGenerateCubemap|TextureImporterMipFilter|TextureImporterNPOTScale|TextureImporterNormalFilter| )\\b',
    caseInsensitive: true },
    { token: 'support.other.js.unity',
    regex: '\\b(?:pragma|strict| )\\b',
    caseInsensitive: true }].concat(rules.start);

    this.$rules = rules;

    this.normalizeRules();
};

unityjavascriptHighlightRules.metaData = { comment: 'Unity API Calls: version 2.1',
      fileTypes: [ 'js' ],
      foldingStartMarker: '/\\*\\*|\\{\\s*$|\\s*(case)',
      foldingStopMarker: '\\*\\*/|^\\s*\\}|^\\s*(break)',
      name: 'unityjavascript',
      scopeName: 'source.js.unity' }


oop.inherits(unityjavascriptHighlightRules, JavaScriptHighlightRules);

exports.unityjavascriptHighlightRules = unityjavascriptHighlightRules;
});

ace.define("ace/mode/unityjavascript",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent","ace/mode/unityjavascript_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var JSMode = require("./javascript").Mode;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;


var unityjavascriptHighlightRules = require("./unityjavascript_highlight_rules").unityjavascriptHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = unityjavascriptHighlightRules;

    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};

oop.inherits(Mode, JSMode);

(function() {
    this.$id = "ace/mode/unityjavascript"
}).call(Mode.prototype);

exports.Mode = Mode;
});
