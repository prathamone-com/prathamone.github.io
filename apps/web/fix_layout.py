import codecs

with codecs.open('src/app/classroom/page.tsx', 'r', 'utf-8') as f:
    code = f.read()

session_block_start = code.find('  // ================= ACTIVE SESSION VIEW (LEGACY) ================= //')
session_return_start = code.find('  return (\n    <div className=\"flex flex-col h-screen bg-brand-background', session_block_start)
end_of_file = code.rfind('}\n')

session_helpers = code[session_block_start:session_return_start]
session_view = code[session_return_start:end_of_file]

code = code[:session_block_start] + '}\n'

part1 = '''            </div>
          )}
        </main>
      </div>
    );
  }

  if (currentView === 'subject') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 pt-24 pb-20">'''

part2 = '''            </div>
          )}
        </div>
        ) : currentView === 'subject' ? (
        <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 pb-20">'''
code = code.replace(part1, part2)

p_dash = '''      <main className="flex-1 flex flex-col overflow-hidden relative">


          {/* Epic 4-Card Action Grid */}'''
p_dash2 = '''      <main className="flex-1 flex flex-col overflow-hidden relative">
        {currentView === 'dashboard' ? (
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Epic 4-Card Action Grid */}'''
code = code.replace(p_dash, p_dash2)

part3 = '''              </motion.div>

            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }'''
part4 = '''              </motion.div>

            )}
          </AnimatePresence>
        </motion.div>
        </div>
        ) : null}
      </main>
    </div>
  );'''
code = code.replace(part3, part4)

view_renders_idx = code.find('  // ================= VIEW RENDERS ================= //')

new_code = code[:view_renders_idx] + session_helpers + '\n  if (currentView === \'session\') {\n  ' + session_view.strip() + '\n  }\n\n' + code[view_renders_idx:]

with codecs.open('src/app/classroom/page.tsx', 'w', 'utf-8') as f:
    f.write(new_code)
