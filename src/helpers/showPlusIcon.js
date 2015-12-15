/**
 * Created by valeriy.abornyev on 12/15/2015.
 */
function showPlusIcon() {
    var self = this;

    network.on('afterDrawing', function (ctx) {

        self.nodesOnCanvas.forEach(function(nodeId){
            var nodeModel = self.dataCollection.findCollection(nodeId);

            var countReference = getReferencesCount(nodeModel, self.nodesOnCanvas);

            if(countReference !== nodes._data[nodeId].referenceTo) {

                var nodePosition = network.getPositions([nodeId]);

                ctx.strokeStyle = '#2B7CE9';
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.beginPath();
                ctx.circle(nodePosition[nodeId].x + 25, nodePosition[nodeId].y - 25, 7);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#2B7CE9';
                ctx.beginPath();
                ctx.fillRect(nodePosition[nodeId].x + 24, nodePosition[nodeId].y - 30, 2, 10);
                ctx.fillRect(nodePosition[nodeId].x + 20, nodePosition[nodeId].y - 26, 10, 2);
                ctx.closePath();
                ctx.fill();
            }

        });



    });
}

function getReferencesCount(model, nodesOnCanvas) {
    var countReference = 0;
    model.get('elements').each(function(model) {
        if(model.get('referenceTo') !== undefined && nodesOnCanvas.indexOf(model._getRelatedTableName(model.get('referenceTo'))) !== -1) {
            return countReference++;
        }
    });
    return countReference
}

module.exports =  showPlusIcon;