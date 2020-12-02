export const static_items = [
  {
    id: '1',
    resourcePid: '0',
    name: '分组1',
    ext: 'group',
    children: [
      {
        id: '11',
        resourcePid: '1',
        name: '表单1',
        ext: 'flow',
      },
      {
        id: '12',
        resourcePid: '1',
        name: '表单2',
        ext: 'noFlow',
      },
    ],
  },
  {
    id: '2',
    resourcePid: '0',
    name: '分组2',
    ext: 'group',
    children: [
      {
        id: '21',
        resourcePid: '1',
        name: '表单3',
        ext: 'flow',
      },
      {
        id: '22',
        resourcePid: '1',
        name: '表单4',
        ext: 'noFlow',
      },
    ],
  },
  {
    id: '3',
    resourcePid: '1',
    name: '表单5',
    ext: 'noFlow',
  },
  {
    id: '4',
    resourcePid: '1',
    name: '空分组',
    ext: 'group',
    children: [],
  },
];
