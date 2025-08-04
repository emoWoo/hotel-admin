export default function getConfirmTitle(type){
    const titles={
        delete:'确定删除吗？',
        permanent_delete:'确定永久删除吗？',
        restore:'确定恢复吗？',
    }
    return titles[type] || '确定操作吗？';
} 